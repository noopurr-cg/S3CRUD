// Import AWS SDK S3 Client
import { S3Client, ListObjectsV2Command, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

// Initialize S3 client with region
const s3Client = new S3Client({ region: "us-east-2" });

// Lambda handler
export const handler = async (event) => {
const bucketName = "my-aws-lambda-gcp";
const command = new ListObjectsV2Command({ Bucket: bucketName });

try {
const response = await s3Client.send(command);
const files = response.Contents || [];

// Build HTML response
let html = `<!DOCTYPE html>
<html>
<head><title>S3 Bucket Contents</title></head>
<body>
<h1>Files in ${bucketName}</h1>
<ul>`;

for (const file of files) {
html += `<li>${file.Key}</li>`;
}

html += `</ul>
</body>
</html>`;

return {
statusCode: 200,
headers: { "Content-Type": "text/html" },
body: html,
};
} catch (err) {
return {
statusCode: 500,
body: `Error: ${err.message}`,
};
}
};