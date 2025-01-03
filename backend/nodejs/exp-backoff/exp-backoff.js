/**
* @typedef {Object} BackoffConfig
* @property {Function} fn - Async function to be retried
* @property {number} [maxAttempts=5] - Maximum number of retry attempts
* @property {number} [baseDelay=1000] - Initial delay in milliseconds
* @property {number} [maxDelay=32000] - Maximum delay between retries
* @property {number} [factor=2] - Multiplier for exponential increase
* @property {boolean} [jitter=true] - Add randomization to delay
* @property {Function} [onError=null] - Error handling callback
*/

/**
* Implements exponential backoff retry logic for async functions
* @param {BackoffConfig} config - Configuration object
* @returns {Promise} Result of the retried function
* @throws {Error} Throws if max attempts reached
*/
const exponentialBackoff = async ({
    fn,
    maxAttempts = 5,
    baseDelay = 1000,
    maxDelay = 32000,
    factor = 2,
    jitter = true,
    onError = null
   }) => {
    let attempt = 1;
   
    while (attempt <= maxAttempts) {
      try {
        // Try to execute the function
        return await fn();
      } catch (error) {
        // If we're out of attempts, throw the error
        if (attempt === maxAttempts) throw error;
        
        // Call error handler if provided
        if (onError) onError(error, attempt);
   
        // Calculate delay: baseDelay * (factor ^ attemptNumber)
        const delay = Math.min(
          baseDelay * Math.pow(factor, attempt - 1),
          maxDelay
        );
   
        // Add ±25% random jitter if enabled
        const jitterDelay = jitter
          ? delay * (0.75 + Math.random() * 0.5)
          : delay;
   
        // Wait for calculated delay
        await new Promise(resolve => setTimeout(resolve, jitterDelay));
        attempt++;
      }
    }
   };