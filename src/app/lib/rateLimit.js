import initRateLimit from "next-rate-limit";

const otpLimiter = initRateLimit({
  limits: [
    {
      windowMs: 60 * 1000, // 1 minute
      max: 2, // Limit to 2 requests per window
    },
  ],
});

export default function rateLimit(req, res) {
  return otpLimiter.check(req, res);
}