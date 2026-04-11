"use client"
import { useState } from "react";

export default function Chat() {
    const [message,setMessage] = useState("")
    const [response,setResponse] = useState("")
    const [streaming,setStreaming] = useState(false)
    const [streamingResponse,setStreamingResponse] = useState("")
    const [loading,setLoading] = useState(false);

    const handleChat = async () =>{
        setLoading(true);
        setResponse("");
        try{
           const res = await fetch("api/chat",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({message})
            })
            const data = await res.json();
            setResponse(data.response);
        } catch (error){
            if (error instanceof Error) {
                setResponse("Error:" + error.message);
            } else {
                setResponse("An unknown error occurred.");
            }
        } finally {
            setLoading(false)
        }

    }

    const handleStreamChat = async () =>{
        setStreaming(true);
        setStreamingResponse("");
        try{
           const res = await fetch("api/chat-stream",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({message})
            })
            const reader = res.body?.getReader();
            const decoder = new TextDecoder();

            while(true){
                const result = await reader?.read();
                if (!result) break;
                const { done, value } = result;
                if (done) break;
                const chunk = decoder.decode(value);
                const lines = chunk.split("\n");

                for(const line of lines){
                    if(line.startsWith("data: ")){
                       const data = JSON.parse(line.slice(6));
                    //    slice(6) is for data: 
                       setStreamingResponse((prev)=> prev + data.content);
                    }
                }
            }
            
        } catch (error){
            if (error instanceof Error) {
                setStreamingResponse("Error:" + error.message);
            } else {
                setStreamingResponse("An unknown error occurred.");
            }
        } finally {
            setStreaming(false)
        }

    }
  return (
     <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto">
        
        {/* Header Section */}
        <header className="bg-orange-500 rounded-t-2xl p-6 shadow-lg">
          <h1 className="text-2xl md:text-3xl font-bold text-white text-center tracking-tight">
            Chat App
          </h1>
        </header>

        {/* Main Content Card */}
        <div className="bg-white rounded-b-2xl shadow-xl border-x border-b border-slate-200 p-6 md:p-8 space-y-8">
          
          {/* Input Area */}
          <div className="space-y-2">
            <label htmlFor="message" className="block text-sm font-semibold text-slate-700">
              Your Message
            </label>
            <textarea
              id="message"
              rows={4}
              className="w-full p-4 rounded-xl border border-slate-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none text-slate-800 placeholder-slate-400 resize-none shadow-sm"
              placeholder="Type something interesting..."
              value={message} 
              onChange={(e)=> setMessage(e.target.value)} 
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={handleChat} className="flex-1 max-w-xs px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all active:scale-95">
              {loading ? "Loading..." : "Send Chat"}
            </button>
            <button onClick={handleStreamChat} className="flex-1 max-w-xs px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all active:scale-95">
              {streaming ? "Loading streaming..." : "Send Stream Chat"}
            </button>
          </div>

          {/* Response Displays */}
          <div className="space-y-6 pt-4">
            <section>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 ml-1">
                Regular Response
              </h3>
              <div className="min-h-[60px] w-full p-4 bg-green-50 border border-green-200 rounded-xl text-slate-800 leading-relaxed shadow-inner">
                {response}
              </div>
            </section>

            <section>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 ml-1">
                Stream Response
              </h3>
              <div className="min-h-[60px] w-full p-4 bg-purple-50 border border-purple-200 rounded-xl text-slate-800 leading-relaxed shadow-inner">
                {streamingResponse}
              </div>
            </section>
          </div>
        </div>
        
      </div>
    </div>
  );
}
