import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Workflow } from '@/models/Workflow';

export async function GET() {
  try {
    await connectDB();
    const workflows = await Workflow.find({}).sort({ updatedAt: -1 });
    return NextResponse.json(workflows);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch workflows' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectDB();

    const workflow = new Workflow({
      ...body,
      userId: 'temp-user-id', // Replace with actual user ID from auth
    });

    await workflow.save();
    return NextResponse.json(workflow);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create workflow' }, { status: 500 });
  }
}