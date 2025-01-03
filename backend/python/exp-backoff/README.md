# Exponential Backoff Function

## Why Use Exponential Backoff?
Exponential backoff helps maintain system stability when dealing with unstable operations like API calls, network requests, or database operations. It progressively increases delay between retry attempts, preventing system overload while maximizing chances of successful execution.

## Features
- Simple implementation with no external dependencies
- Configurable retry attempts and delays
- Random jitter to prevent thundering herd problems
- Comprehensive error handling

## Installation
Copy `exp_backoff.py` into your project directory.

## Usage
```python
from exp_backoff import exp_backoff

# Basic usage
def my_unstable_function():
    # Your code here that might fail
    return result

result = exp_backoff(my_unstable_function)

# Custom configuration
result = exp_backoff(
    func=my_unstable_function,
    max_attempts=3,
    base_delay=2,
    max_delay=30
)
```

## Parameters
- `func`: Function to execute
- `max_attempts`: Maximum retry attempts (default: 5)
- `base_delay`: Initial delay in seconds (default: 1)
- `max_delay`: Maximum delay cap in seconds (default: 60)

## Error Handling
If all retry attempts fail, the function raises the last encountered exception.