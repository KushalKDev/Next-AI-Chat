
import { NextRequest } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL:"https://generativelanguage.googleapis.com/v1beta/openai/"
});

export async function POST(request:NextRequest) {
    try{
     const {message} =  await request.json()
     
     const completions = await openai.chat.completions.create({
        model:"gemini-3-flash-preview",
        messages: [{role:"user",content:message}]
     })
     return Response.json({
        response:completions.choices[0].message.content
     })
    } catch (error: unknown) {
        return Response.json({
            error: "Failed to process request"+error
        },{status:500})
    }
}