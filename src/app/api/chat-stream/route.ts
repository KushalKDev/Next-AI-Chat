
import { NextRequest } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    baseURL:"https://generativelanguage.googleapis.com/v1beta/openai/"
});

export async function POST(request:NextRequest) {
    try{
     const {message} =  await request.json()
     const stream = await openai.chat.completions.create({
        model:"gemini-3-flash-preview",
        messages: [{role:'user',content:message}],
        stream:true
     })
     const encoder = new TextEncoder()

    const readable =  new ReadableStream({
        async start(controller){
            for await (const chunk of stream){
               const content = chunk.choices[0]?.delta?.content || "";
               if(content){
                controller.enqueue(encoder.encode(`data: ${JSON.stringify({content})}\n\n`))
                // \n\n denotes data is completed
               }
            }
            controller.close();
        }
    })

    return new Response(readable,{
        headers:{
            'Content-Type':"text/event-stream",
            'Cache-Control':"no-cache",
            "Connection":"Keep-alive"
        }
    })
    } catch (error: unknown) {
        return Response.json({
            error: "Failed to process request"+error
        },{status:500})
    }
}