def exp_backoff(func, max_attempts=5, base_delay=1, max_delay=60):
   """
   Retry a function with exponential backoff.
   
   Args:
       func: Function to execute
       max_attempts: Maximum number of retry attempts
       base_delay: Initial delay in seconds
       max_delay: Maximum delay in seconds
   
   Returns:
       Result of the function if successful
   
   Raises:
       Exception: If all retry attempts fail
   """
   import time
   import random

   for attempt in range(max_attempts):
       try:
           return func()
       except Exception as e:
           if attempt == max_attempts - 1:
               raise e
           
           delay = min(base_delay * (2 ** attempt) + random.uniform(0, 1), max_delay)
           time.sleep(delay)