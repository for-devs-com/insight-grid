import {getAppState, saveAppState} from '@/lib/utils/stateService';
import {NextApiRequest, NextApiResponse} from 'next';

export const getUserState = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const userId = req.query.userId;

        if (!userId) {
            return res.status(400).json({message: 'userId is required'});
        }

        const appState = await getAppState(userId as string);
        if (!appState) {
            return res.status(404).json({message: 'User state not found'});
        }

        return res.status(200).json(appState);
    } catch (error) {
        console.error('Error loading user state:', error);
        return res.status(500).json({message: 'Internal Server Error'});
    }
};

export const saveUserState = async (req: NextApiRequest, res: NextApiResponse) => {

    const {userId, canvasState} = req.body;
    if (!userId) {
        return res.status(400).json({message: 'userId is required'});
    }

    try {
        await saveAppState(userId, canvasState);
        return res.status(200).json({message: 'State saved successfully!'});
    } catch (error) {
        console.error('Error saving user state:', error);
        return res.status(500).json({message: 'Error saving state'});
    }
};
