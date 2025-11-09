# AWS Amplify Deployment Guide

## Issue: Environment Variables Not Updating After Deployment

### Problem
After adding environment variables in AWS Amplify, the app still points to `localhost` instead of the production API URL.

### Root Cause
Next.js environment variables prefixed with `NEXT_PUBLIC_` are **embedded at build time**, not runtime. This means:
- Variables are baked into the JavaScript bundle during the build
- Changing environment variables in Amplify Console doesn't affect already-built apps
- You must trigger a new build for changes to take effect

---

## Solution: Step-by-Step Fix

### Step 1: Set Environment Variables in Amplify Console

1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Select your app
3. Navigate to **App settings** → **Environment variables**
4. Add/Update these variables:

| Variable Name | Value |
|--------------|-------|
| `NEXT_PUBLIC_API_BASE_URL` | `http://movie-be-env.eba-mkpv9mkm.ap-southeast-1.elasticbeanstalk.com` |
| `NEXT_PUBLIC_API_VERSION` | `v1` |
| `NEXT_PUBLIC_API_DEBUG` | `false` |

**Important Notes:**
- ✅ Use **EXACT** variable names (case-sensitive)
- ✅ Do NOT include quotes around the URL
- ✅ Do NOT add trailing slash to the URL
- ❌ Don't add prefixes like `AMPLIFY_` or `AWS_`

### Step 2: Verify Your Environment Variable Configuration

Click on your app in Amplify Console, then check:

```
App settings → Environment variables

Should show:
┌────────────────────────────┬──────────────────────────────────────────────────────────┐
│ Variable                   │ Value                                                    │
├────────────────────────────┼──────────────────────────────────────────────────────────┤
│ NEXT_PUBLIC_API_BASE_URL   │ http://movie-be-env.eba-mkpv9mkm.ap-southeast-1.elast... │
│ NEXT_PUBLIC_API_VERSION    │ v1                                                       │
│ NEXT_PUBLIC_API_DEBUG      │ false                                                    │
└────────────────────────────┴──────────────────────────────────────────────────────────┘
```

### Step 3: Trigger a New Build

After setting environment variables, you MUST trigger a new deployment:

**Option A: Redeploy (Recommended)**
1. Go to **App settings** → **Build settings**
2. Click **Redeploy this version** button
3. Or push a new commit to trigger automatic deployment

**Option B: Manual Trigger**
1. Make a small change to your code (e.g., update README)
2. Commit and push:
   ```bash
   git commit --allow-empty -m "Trigger rebuild with new env vars"
   git push
   ```

### Step 4: Verify the Build

1. Go to your Amplify app in the console
2. Click on the latest build
3. Expand the **Build** phase
4. Look for environment variables in the build logs:

```
# Build logs should show:
Environment variables:
  NEXT_PUBLIC_API_BASE_URL=http://movie-be-env.eba-mkpv9mkm.ap-southeast-1.elasticbeanstalk.com
  NEXT_PUBLIC_API_VERSION=v1
  NEXT_PUBLIC_API_DEBUG=false
```

### Step 5: Test the Deployed App

1. Open your Amplify app URL in the browser
2. Open browser **Developer Tools** (F12)
3. Go to **Console** tab
4. Type and run:
   ```javascript
   console.log(process.env.NEXT_PUBLIC_API_BASE_URL)
   ```
   
   **Expected output:**
   ```
   http://movie-be-env.eba-mkpv9mkm.ap-southeast-1.elasticbeanstalk.com
   ```

5. Or check the Network tab and verify API calls are going to the correct URL

---

## Troubleshooting

### Issue: Environment variables still showing localhost

**Possible Causes:**

1. **Build wasn't triggered after setting variables**
   - Solution: Force a new deployment (see Step 3)

2. **Variables set in wrong branch**
   - Solution: Ensure variables are set for the correct branch (main, develop, etc.)
   - Go to: App settings → Environment variables → Select your branch

3. **Caching issues in Amplify**
   - Solution: Clear build cache
   - In build settings, add to `preBuild` phase:
     ```yaml
     preBuild:
       commands:
         - npm cache clean --force
         - rm -rf .next
     ```

4. **Browser caching old JavaScript**
   - Solution: Hard refresh in browser
   - Chrome/Firefox: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
   - Or open in Incognito/Private mode

### Issue: Build fails after adding environment variables

**Check:**
1. Syntax in `next.config.mjs` is correct
2. No typos in variable names
3. Build logs for specific errors

### Issue: API calls return CORS errors

**This is different from env var issue:**
1. Check backend CORS configuration
2. Ensure backend allows requests from Amplify domain
3. Update backend environment variables to include Amplify URL in allowed origins

---

## Best Practices

### Development vs Production Environments

Create separate environment variables for different branches:

**Development Branch:**
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3025
```

**Production Branch (main):**
```
NEXT_PUBLIC_API_BASE_URL=http://movie-be-env.eba-mkpv9mkm.ap-southeast-1.elasticbeanstalk.com
```

### Security Considerations

1. **Never commit `.env.local`** to git (already in `.gitignore`)
2. **Use Amplify Console** for production secrets
3. **Don't expose sensitive data** in `NEXT_PUBLIC_*` variables (they're visible in browser)
4. **For sensitive keys**, use server-side environment variables (without `NEXT_PUBLIC_` prefix)

### Build Optimization

Update your `amplify.yml` (if it exists) to explicitly use environment variables:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - echo "NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL"
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
      - .next/cache/**/*
```

---

## Quick Verification Checklist

- [ ] Environment variables are set in Amplify Console
- [ ] Variable names match exactly (case-sensitive): `NEXT_PUBLIC_API_BASE_URL`
- [ ] Variables are set for the correct branch
- [ ] New build was triggered after setting variables
- [ ] Build completed successfully
- [ ] Browser console shows correct API URL
- [ ] Network requests go to production API, not localhost
- [ ] No CORS errors in console

---

## Current Production Configuration

**Backend API URL:**
```
http://movie-be-env.eba-mkpv9mkm.ap-southeast-1.elasticbeanstalk.com
```

**Frontend Amplify URL:**
```
[Your Amplify app URL here]
```

**Backend CORS Configuration:**
Ensure your backend allows requests from the Amplify domain. Check:
- `/Users/kamran/Work/NLabs/movie-be/src/main.ts`
- Look for `cors` configuration
- Add Amplify URL to allowed origins if needed

---

## Additional Resources

- [Next.js Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
- [AWS Amplify Environment Variables](https://docs.aws.amazon.com/amplify/latest/userguide/environment-variables.html)
- [Next.js Deployment on Amplify](https://docs.aws.amazon.com/amplify/latest/userguide/deploy-nextjs-app.html)

---

## Need Help?

If you're still experiencing issues:

1. Check build logs in Amplify Console
2. Verify environment variables are displayed in build output
3. Test with a simple console.log in your code
4. Ensure backend is accessible from the internet (not just localhost)
5. Check backend logs for incoming requests

