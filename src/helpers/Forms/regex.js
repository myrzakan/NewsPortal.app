export const Regex = {
  Email: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
  Username: /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{1,29}$/,
  LowercaseEmail: /^[a-z0-9._]+@[a-z0-9]+\.[a-z]+$/,
  
}