import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RobotAvatar from "../components/custom/RobotAvatar";

const AVATAR_SIZE = 320;

export default function StartPage() {
  const navigate = useNavigate();
  const [isRobotSpeaking, setIsRobotSpeaking] = useState(false);
  const [isRobotMuted, setIsRobotMuted] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [showButton, setShowButton] = useState(false);

  const welcomeMessage =
    "مرحباً بك في  زين كاش، أنا مساعدك الذكي AI Agent لتحويل شكاوى العملاء إلى تذاكر للقسم المختص داخل الشركة.";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(welcomeMessage.slice(0, i + 1));
      i++;
      if (i >= welcomeMessage.length) {
        clearInterval(interval);
        setTimeout(() => setShowButton(true), 300);
      }
    }, 35);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (typedText.length < welcomeMessage.length) {
      setIsRobotSpeaking(true);
    } else {
      setIsRobotSpeaking(false);
    }
  }, [typedText]);

  const handleToggleRobotMute = () => {
    setIsRobotMuted((m) => !m);
    setIsRobotSpeaking((s) => !s);
  };

  const handleStart = () => {
    setIsRobotSpeaking(true);
    setTimeout(() => {
      setIsRobotSpeaking(false);
      navigate("/complaines");
    }, 900);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-app-gradient text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-brand-blue/20 blur-[120px] animate-pulse-slow" />
        <div className="absolute -bottom-40 -right-40 h-[32rem] w-[32rem] rounded-full bg-brand-teal/20 blur-[120px] animate-pulse-slow delay-1000" />
        <div className="absolute top-1/3 left-1/2 h-[24rem] w-[24rem] -translate-x-1/2 rounded-full bg-purple-600/10 blur-[100px] animate-float" />
      </div>

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#3B73FF 1px, transparent 1px), linear-gradient(90deg, #3B73FF 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="absolute top-4 right-4 sm:top-5 sm:right-6 z-10">
        <span className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-brand-gradient">
          محفظة زين كاش الرقمية{" "}
        </span>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 pb-10">
        <div className="flex justify-center pt-10 sm:pt-14 pb-2 sm:pb-4">
          <RobotAvatar
            size={AVATAR_SIZE}
            speaking={isRobotSpeaking}
            showMicButton={true}
            onToggleSpeaking={handleToggleRobotMute}
            isMuted={isRobotMuted}
          />
        </div>

        <div className="flex flex-col items-center text-center w-full max-w-2xl mt-4">
          <p className="font-almarai text-lg sm:text-2xl leading-relaxed font-bold text-transparent bg-clip-text bg-brand-gradient min-h-[4rem]">
            {typedText}
            {typedText.length < welcomeMessage.length && (
              <span className="inline-block w-[2px] h-[1em] align-middle bg-brand-teal ml-1 animate-blink" />
            )}
          </p>

          <button
            type="button"
            onClick={handleStart}
            className={`
              mt-10 group relative px-10 py-3 rounded-md
              bg-brand-gradient text-white font-almarai font-bold text-base
              shadow-[0_0_30px_-5px_rgba(59,115,255,0.6)]
              hover:shadow-[0_0_40px_-2px_rgba(44,167,124,0.7)]
              transition-all duration-300 ease-out
              hover:scale-105 active:scale-95
              overflow-hidden
              ${showButton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}
            `}
            style={{ transition: "opacity 0.6s ease, transform 0.6s ease" }}
          >
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <span className="relative z-10">أبدأ</span>
          </button>
        </div>
          <div class="mt-20 font-light text-center">
              <p className="text-gray-400">تم التطوير من قبل فريق <b>Enki AI Coders</b> <br/> لمسابقة هاكثون زين العراق للذكاء الاصطناعي</p>
          </div>
      </div>
    </div>
  );
}
