# Deploy Your Website to AWS (Easy Mode) 🚀

This template helps you put your website on the internet using AWS. Works for any static website (HTML/CSS/JS, React, Vue, etc.).

## 3 Simple Steps

### 1. Save this File
Copy the template code and save it as `template.yaml` in your project folder.

### 2. Deploy to AWS
Open your terminal and run:
```bash
aws cloudformation deploy \
  --template-file template.yaml \
  --stack-name my-website \
  --parameter-overrides \
    StackPrefix=my-website \
    Environment=dev \
  --capabilities CAPABILITY_IAM
```

### 3. Upload Your Website
Once deployed, get your S3 bucket name:
```bash
aws cloudformation describe-stacks \
  --stack-name my-website \
  --query 'Stacks[0].Outputs[?OutputKey==`BucketName`].OutputValue' \
  --output text
```

Then upload your website files:
```bash
aws s3 sync ./your-website-folder s3://BUCKET_NAME/
```

## That's It! 🎉

Your website will be available at the CloudFront URL. To get it, run:
```bash
aws cloudformation describe-stacks \
  --stack-name my-website \
  --query 'Stacks[0].Outputs[?OutputKey==`CloudFrontDomainName`].OutputValue' \
  --output text
```

## What You Get
- A secure place to store your website files
- Fast content delivery worldwide
- HTTPS security included
- Works with single-page apps (React, Vue, etc.)

**Note**: It takes about 15 minutes for your website to be available after uploading. This is normal!

## Need to Update Your Website?
Just run the upload command again with your new files!