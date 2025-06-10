import { Request, Response } from 'express';

class HealthController {

  public healthCheck = (req: Request, res: Response): void => {
    res.status(200).json({
      status: 'success',
      message: 'Server is running normally',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  };
}

export default new HealthController();
