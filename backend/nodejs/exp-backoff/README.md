# Exponential Backoff Utility
A simple utility that automatically retries failed operations with increasing delays between attempts.

## Why Use This?
- Handles temporary failures gracefully
- Prevents server overload
- Perfect for API calls and network operations

## Usage
```javascript
const getData = async () => {
  return exponentialBackoff({
    fn: async () => {
      const response = await fetch('https://api.example.com/data');
      return response.json();
    },
    maxAttempts: 3
  });
};
```

## Config Options
- `fn`: Function to retry
- `maxAttempts`: Max retries (default: 5)
- `baseDelay`: Initial delay ms (default: 1000)
- `maxDelay`: Max delay ms (default: 32000)
- `factor`: Delay multiplier (default: 2)
- `jitter`: Random delay (default: true)
- `onError`: Error handler (optional)