import {Request, Response} from 'express'; 
import {StatusCodes} from 'http-status-codes';
import {validateTaskUsers, firstPartAuth} from './validateTaskUsers';

const updateTaskMembers = async (req: Request, res: Response) => {
    const task = res.locals.task;

    const {error} = firstPartAuth(req.body);
    if(error) return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

    //Check if user already exist variable
    let check = false;
    //Add user
    if(!req.body.delete){

        const {error} = validateTaskUsers(req.body);

        if(error) return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

        //Check if user is already in team
        task.members.forEach((el:any)=>{
            if(el.id==req.body.member.id){
                check = true; 
            }
        })

        task.members.push(req.body.member);
    }
    //Remove user
    else{
        task.members.forEach((member: any, index: number)=>{
            if(member.id == req.body.member.id){
                task.members.splice(index,1);
            }
        })
    } 
    //return if users exists in task
    if(check) return res.status(StatusCodes.BAD_REQUEST).send('User already exists');
    await task.save();
    return res.status(StatusCodes.OK).send(task);
}   

export default updateTaskMembers;