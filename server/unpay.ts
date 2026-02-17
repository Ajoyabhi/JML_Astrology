import crypto from 'crypto';
import { Agent as HttpAgent } from 'http';
import { Agent as HttpsAgent } from 'https';
import https from 'https';

/**
 * Encrypts text using AES-256-CBC encryption
 * Matches the exact encryption logic from the user's implementation
 */
export async function encryptText(plainText: string, key: string, aesIv: string): Promise<string> {
  const iv = aesIv; // Use IV as provided
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(plainText, "utf8", "hex");
  encrypted += cipher.final("hex");
  
  // Return the encrypted text in hex format
  const encryptedText = encrypted;
  
  return encryptedText;
}

/**
 * Creates IPv4 agents to force IPv4 connection
 */
export function createIPv4Agents() {
  const httpAgent = new HttpAgent({
    family: 4, // Force IPv4
    keepAlive: true
  });

  const httpsAgent = new HttpsAgent({
    family: 4, // Force IPv4
    keepAlive: true
  });

  return { httpAgent, httpsAgent };
}

interface UnpayPayinData {
  order_amount: number;
  reference_id: string;
}

interface UnpayPayinResponse {
  statuscode: string;
  message: string;
  data?: {
    apitxnid?: string;
    qrString?: string;
    [key: string]: any;
  };
}

/**
 * Initiates payment with Unpay API
 */
export async function unpayPayin(
  payinData: UnpayPayinData,
  user_id: string
): Promise<UnpayPayinResponse> {
  try {
    const { order_amount, reference_id } = payinData;

    // Unpay API credentials
    const aesKey = "XRUhoLqUBgmZFLdWT5PiuNQnGhI9l6Pc";
    const aesIV = "oR21lVkifQEBNRQS";
    const apiKey = "QPf0uqDt0EjQqkseizXyr1Ydn21HF9cOiQEFtjrV";
    const partnerId = "4071";
    
    // Get webhook URL - adjust based on your deployment
    const baseUrl = process.env.BASE_URL || 'https://payvex.in';
    const webhookUrl = `${baseUrl}/api/payments/unpay/callback`;
    
    console.log("webhookUrl", webhookUrl);

    // Prepare request body - ensure no extra spaces in JSON
    const requestBody = {
      partner_id: partnerId,
      amount: parseInt(order_amount.toString()),
      apitxnid: reference_id,
      webhook: webhookUrl
    };

    const requestBodyString = JSON.stringify(requestBody);
    console.log("Request body JSON:", requestBodyString);
    
    const encryptedRequestBody = await encryptText(requestBodyString, aesKey, aesIV);
    console.log("Encrypted body (first 50 chars):", encryptedRequestBody.substring(0, 50));

    // Create IPv4 agents to force IPv4 connection
    const { httpsAgent } = createIPv4Agents();

    // Make API request to Unpay using native https module
    const requestData = JSON.stringify({
      body: encryptedRequestBody
    });

    const result = await new Promise<any>((resolve, reject) => {
      const options = {
        hostname: 'unpay.in',
        port: 443,
        path: '/tech/api/next/upi/request/qr',
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'api-key': apiKey,
          'content-type': 'application/json',
          'content-length': Buffer.byteLength(requestData)
        },
        agent: httpsAgent
      };

      const req = https.request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          try {
            if (res.statusCode !== 200) {
              reject(new Error(`unpay error: ${data || 'Unknown error'}`));
            } else {
              resolve(JSON.parse(data));
            }
          } catch (error) {
            reject(new Error(`Failed to parse response: ${error}`));
          }
        });
      });

      req.on('error', (error) => {
        reject(new Error(`Request failed: ${error.message}`));
      });

      req.write(requestData);
      req.end();
    });

    console.log("this is the result of unpay payin", result);
    
    if (result.statuscode == "TXN") {
      return {
        statuscode: result.statuscode,
        message: result.message,
        data: {
          apitxnid: result.data?.apitxnid,
          qrString: result.data?.qrString,
        }
      };
    } else {
      return {
        statuscode: result.statuscode,
        message: result.message,
        data: result.data
      };
    }

  } catch (error: any) {
    console.error('Error processing payin request', {
      error: error.message,
      stack: error.stack
    });
    throw error;
  }
}

