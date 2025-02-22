import Users from "../model/user.model";

export const checkEmailExists = async (email: string) => {
return await Users.findOne({email});
};

export const createUser = async (userPayload: any) => {
return Users.create(userPayload);
};

export const fetchUserById = async (id: string)=>{
  return await Users.findById(id).select('-password');
};