// import { Request, Response } from 'express';
// import projectModel from '../../models/projects.model';
// import { StatusCodes } from 'http-status-codes';

// const updateProject = async(req: Request,res: Response) => {
//     const project = await projectModel.findByIdAndUpdate(req.params.id,{
//         projectName: req.body.projectName,
//         ownerId: req.body.ownerId,
//         scrumMasterId: req.body.scrumMasterId,
//         qaEngineerId: req.body.qaEngineerId,
//         normalUsersId: req.body.normalUsersId,
//         backendDevsId: req.body.backendDevsId,
//         frontendDevsId: req.body.frontendDevsId,
//         designersId: req.body.designersId,
//     }, { new: true,useFindAndModify: false });
//     if(!project) return res.status(StatusCodes.NOT_FOUND).send('Project not found');

//     return res.status(StatusCodes.OK).send(project)
// }

// export default updateProject;
