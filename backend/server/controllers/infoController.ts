import { Request, Response } from 'express';
// import { User } from '../models/user';

export const info = async (req: Request, res: Response) => {
//   const { error } = loginValidation(req.body);
//   if (error) return res.json({ status: false, error: error.details[0].message });

//   const user = await User.findOne({ email: req.body.email });
//   if (!user) return res.json({ status: false, error: 'Incorrect account details' });

//   const validPass = await bcrypt.compare(req.body.password, user.password);
//   if (!validPass) return res.json({ status: false, error: 'Incorrect account details' });
//   let token: string = '';

//   if (process.env.TOKEN_SECRET) {
//     token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
//   } else {
//     res.status(400).send('SECRET not found');
//   }

  return res.json({
    status: true
  });
};