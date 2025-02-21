import Users from "../model/user.model";

export const checkEmailExists = async (email: string) => {
return await Users.findOne({email},{password: 0});
};

export const createUser = async (userPayload: any) => {
return Users.create(userPayload);
};

export const fetchUserById = async (id: number)=>{
  return await Users.findById(id, {password: 0});
};