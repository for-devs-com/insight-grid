// api/state/route.ts
import { getUserState, saveUserState } from '@/app/controllers/stateController';
import { NextApiRequest, NextApiResponse } from 'next';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    return getUserState(req, res);
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    return saveUserState(req, res);
}
