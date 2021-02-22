import {Request, Response} from 'express'; 
import {StatusCodes} from 'http-status-codes';
import {validateTaskUsers, firstPartAuth} from './validateTaskUsers';
import userModel from '../../models/user.model';

const updateTaskMembers = async (req: Request, res: Response) => {
    const task = res.locals.task;

    const {error} = firstPartAuth(req.body);
    if(error) return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

    if(!req.body.delete){

        const {error} = validateTaskUsers(req.body);
        if(error) return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

        task.members.push(req.body.member);
    }else{
        task.members.forEach((member: any, index: number)=>{
            if(member.id == req.body.member.id){
                task.members.splice(index,1);
            }
        })
    }   

    await task.save();
    return res.status(StatusCodes.OK).send(task);
}   

export default updateTaskMembers;