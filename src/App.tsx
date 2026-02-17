import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Fingerprint, Camera, Terminal, Scan, Calculator } from "lucide-react";

const MarwanArchive = () => {
  const [step, setStep] = useState(-2);
  const [isSensitiveVisible, setIsSensitiveVisible] = useState(false);
  const [longPressActive, setLongPressActive] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [isScanned, setIsScanned] = useState(false);
  const [mathSolved, setMathSolved] = useState(false);
  const [textVisible, setTextVisible] = useState("");
  const [timerData, setTimerData] = useState({ d: 0, h: 0, m: 0, s: 0 });

  const audioRef = useRef<HTMLAudioElement>(null);
  const sensitiveVideoRef = useRef<HTMLVideoElement>(null);

  const glassStyle: React.CSSProperties = {
    background: "rgba(10, 10, 20, 0.92)",
    backdropFilter: "blur(20px)",
    borderRadius: "25px",
    border: "2px solid #00f2ff",
    padding: "30px 20px",
    textAlign: "center",
    maxWidth: "450px",
    width: "90%",
    color: "#fff",
    boxShadow: "0 0 40px rgba(0, 242, 255, 0.15)",
    zIndex: 20,
    position: "relative",
    overflow: "hidden",
  };

  const neonBtn: React.CSSProperties = {
    background: "transparent",
    color: "#00f2ff",
    border: "1px solid #00f2ff",
    padding: "14px",
    borderRadius: "12px",
    cursor: "pointer",
    width: "100%",
    marginTop: "15px",
    fontWeight: "800",
    fontSize: "1rem",
    boxShadow: "0 0 10px rgba(0, 242, 255, 0.2)",
  };

  const fullText =
    "انا اتمنالك كل الخير والتوفيق في حياتك والله يخويا وربنا يعلم ودايما بدعيلك في انك تلاقي الشغل اللي يريحك والزوجة اللي تبسطك وتسعدك في حياتك وربنا يعلم قد ايه انا بحبك وبحب عيلتك .. كل سنة وانت طيب ورمضان كريم عليك";

  const content = [
    {
      type: "image",
      src: "https://res.cloudinary.com/dj36afflz/image/upload/v1770737946/20250410_204215_vhoxkg.jpg",
      title: "دي اول صورة صورتك فيها من غير ما اخد بالي انك هتكون للاسف اخويا",
      btn: "هههههه كنت بغل اكل",
    },
    {
      type: "image",
      src: "https://res.cloudinary.com/dj36afflz/image/upload/v1770738009/20250417_200527_gxco8x.jpg",
      title: "تعرف حاجة عن صورة دي؟ دي اول ما كنت لسا سيلز وفمكانك",
      btn: "احا كنت بتغفل؟",
    },
    {
      type: "image",
      src: "https://res.cloudinary.com/dj36afflz/image/upload/v1770740164/20250529_224436_grp0fv.jpg",
      title: "دي اول مرة اتجمعنا فيها عالقهوة",
      btn: "أحلى قعدة",
    },
    {
      type: "video",
      src: "https://res.cloudinary.com/dj36afflz/video/upload/v1771328937/Snapchat-1415601600_1_yue8do.mp4",
      title: "فاكر لما عمرو بيه رقعك جول ابن حرام",
      btn: "مش هنسى الوجع ده",
    },
    {
      type: "image",
      src: "https://res.cloudinary.com/dj36afflz/image/upload/v1770740319/IMG-20250809-WA0018_dm4ykb.jpg",
      title: "دي لما روحنا لجملة اول مرة",
      btn: "هعيط وربنا",
    },
    {
      type: "video",
      src: "https://res.cloudinary.com/dj36afflz/video/upload/v1770741165/20250730_185100_ignsey.mp4",
      title: "هنا لما بقيت ليدر في تفاصيل وكنت ليدر على عمرو بيه",
      btn: "ايام وربنا",
    },
    {
      type: "image",
      src: "https://res.cloudinary.com/dj36afflz/image/upload/v1770740369/IMG-20251007-WA0048_n5xmow.jpg",
      title: "بص لحد هنا مكنتش تعرف حلا!! كنت مبسوط يعم",
      btn: "خلاص هسيبها عشانك",
    },
    {
      type: "image",
      src: "https://res.cloudinary.com/dj36afflz/image/upload/v1770740441/IMG-20251123-WA0000_cejblr.jpg",
      title: "هنا بداية لما عرفت حلا يعم وكنت مصاب يعني احا",
      btn: "كمل الفضايح",
    },
    {
      type: "sensitive",
      src: "https://res.cloudinary.com/dj36afflz/video/upload/v1770740612/%D9%84%D9%85%D8%A7_%D8%AF%D8%AE%D9%84_%D9%81%D9%8A%D9%83_%D8%AD%D8%A7%D8%AC%D8%A9_qp8jvl.mp4",
      title: "مش عارف انت هنا دخل فيك ايه؟",
      btn: "تخطى الوجع",
    },
    {
      type: "audio_hold",
      src: "https://res.cloudinary.com/dj36afflz/video/upload/v1770741008/%D8%AE%D9%87%D9%87%D9%87%D9%87%D9%87_yq6dc1.mp3",
      title: "اوعى تدوس هنا! بلاش يابني",
      btn: "استنى شوية",
    },
    {
      type: "math",
      src: "https://res.cloudinary.com/dj36afflz/video/upload/v1770741250/VID-20260129-WA0062_vatydx.mp4",
      title: "حل المعادلة دي عشان تشوف اخر مرة ليك في الشركة",
      btn: "مش عايز ارجع",
    },
    {
      type: "scan",
      src: "https://res.cloudinary.com/dj36afflz/video/upload/v1770741437/%D8%A8%D8%AD%D8%A8_%D8%A7%D9%84%D9%81%D9%8A%D8%AF%D9%8A%D9%88_%D8%AF%D8%A7_%D8%A7%D9%88%D9%82_%D9%85%D9%84%D9%8A%D8%B3_%D8%A7%D9%84%D8%A7_%D9%87%D9%88_sjrivu.mp4",
      title: "ههههه فاكر لما تيزك بقت كاشير؟",
      btn: "مش قادر بجد",
    },
  ];

  useEffect(() => {
    if (step === content.length) {
      let i = 0;
      const textInterval = setInterval(() => {
        setTextVisible(fullText.slice(0, i));
        i++;
        if (i > fullText.length) clearInterval(textInterval);
      }, 50);

      const startDate = new Date("2025-04-10");
      const timerInterval = setInterval(() => {
        const now = new Date();
        const diff = +now - +startDate;
        setTimerData({
          d: Math.floor(diff / (1000 * 60 * 60 * 24)),
          h: Math.floor((diff / (1000 * 60 * 60)) % 24),
          m: Math.floor((diff / (1000 * 60)) % 60),
          s: Math.floor((diff / 1000) % 60),
        });
      }, 1000);

      return () => {
        clearInterval(textInterval);
        clearInterval(timerInterval);
      };
    }
  }, [step, content.length]);

  const progress = step >= 0 ? ((step + 1) / content.length) * 100 : 0;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020205",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {step >= 0 && step < content.length && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "4px",
            background: "rgba(0,242,255,0.1)",
            zIndex: 100,
          }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            style={{
              height: "100%",
              background: "#00f2ff",
              boxShadow: "0 0 10px #00f2ff",
            }}
          />
        </div>
      )}

      {/* Background Particles */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [-20, 1000],
              opacity: [0, 0.7, 0],
              scale: [0, 1.2, 0],
            }}
            transition={{
              duration: Math.random() * 6 + 4,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            style={{
              position: "absolute",
              left: `${Math.random() * 100}%`,
              top: "-5%",
              width: "2px",
              height: "2px",
              background: "#00f2ff",
              borderRadius: "50%",
              boxShadow: "0 0 8px #00f2ff",
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === -2 && (
          <motion.div
            key="fp"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            style={glassStyle}
          >
            <motion.div
              animate={{
                filter: [
                  "drop-shadow(0 0 2px #00f2ff)",
                  "drop-shadow(0 0 10px #00f2ff)",
                  "drop-shadow(0 0 2px #00f2ff)",
                ],
              }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Fingerprint
                size={80}
                color="#00f2ff"
                style={{ marginBottom: "20px" }}
              />
            </motion.div>
            <h2 style={{ fontSize: "22px", marginBottom: "10px" }}>
              نظام التشفير السري
            </h2>
            <p style={{ color: "#888", marginBottom: "20px" }}>
              المس البصمة للتحقق من هوية مروان
            </p>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setStep(-1)}
              style={neonBtn}
            >
              بصمة الإصبع 🔘
            </motion.button>
          </motion.div>
        )}

        {step === -1 && (
          <motion.div
            key="start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={glassStyle}
          >
            <Terminal
              size={55}
              color="#00f2ff"
              style={{ margin: "0 auto 20px" }}
            />
            <h1 style={{ fontSize: "24px", color: "#00f2ff" }}>
              ارشيف الجدعنة
            </h1>
            <p style={{ lineHeight: "1.7", color: "#ccc" }}>
              تم فك التشفير بنجاح.. أهلاً بك يا مروان في رحلة عبر الزمن.
            </p>
            <button onClick={() => setStep(-0.5)} style={neonBtn}>
              يلا بينا يعم وريني
            </button>
          </motion.div>
        )}

        {step === -0.5 && (
          <motion.div
            key="warning"
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={glassStyle}
          >
            <Camera
              size={55}
              color="#ff0055"
              style={{
                margin: "0 auto 20px",
                filter: "drop-shadow(0 0 10px #ff0055)",
              }}
            />
            <h2 style={{ color: "#ff0055", fontSize: "24px" }}>
              بروتوكول التسجيل!
            </h2>
            <p style={{ margin: "15px 0", fontSize: "17px" }}>
              متنساش تصور نفسك فيديو عشان{" "}
              <span style={{ color: "#ffd700" }}>الريأكشن عايز اشوفه</span> 😉📸
            </p>
            <button
              onClick={() => setStep(0)}
              style={{ ...neonBtn, borderColor: "#d9d904", color: "#d9d904" }}
            >
              انجز خلصني يعم
            </button>
          </motion.div>
        )}

        {step >= 0 && step < content.length && (
          <motion.div
            key={step}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            style={glassStyle}
          >
            {content[step].type === "image" && (
              <img
                src={content[step].src}
                style={{
                  width: "100%",
                  borderRadius: "15px",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
                alt="Archive"
              />
            )}

            {content[step].type === "video" && (
              <video
                src={content[step].src}
                autoPlay
                loop
                controls
                playsInline
                style={{ width: "100%", borderRadius: "15px" }}
              />
            )}

            {content[step].type === "sensitive" && (
              <div style={{ position: "relative" }}>
                <video
                  ref={sensitiveVideoRef}
                  src={content[step].src}
                  loop
                  controls
                  playsInline
                  style={{
                    width: "100%",
                    borderRadius: "15px",
                    filter: isSensitiveVisible ? "none" : "blur(30px)",
                  }}
                />
                {!isSensitiveVisible && (
                  <button
                    onClick={() => {
                      setIsSensitiveVisible(true);
                      sensitiveVideoRef.current?.play();
                    }}
                    style={{
                      position: "absolute",
                      top: "40%",
                      left: "25%",
                      background: "#ff0055",
                      padding: "12px 25px",
                      borderRadius: "12px",
                      border: "none",
                      color: "#fff",
                      fontWeight: "bold",
                      cursor: "pointer",
                      boxShadow: "0 0 20px #ff0055",
                    }}
                  >
                    فتح المحتوى 🔞
                  </button>
                )}
              </div>
            )}

            {content[step].type === "audio_hold" && (
              <div style={{ padding: "10px 0" }}>
                {!longPressActive ? (
                  <button
                    onClick={() => {
                      audioRef.current?.play();
                      setLongPressActive(true);
                    }}
                    style={{
                      ...neonBtn,
                      background: "#ff0000",
                      border: "none",
                      color: "white",
                    }}
                  >
                    اوعى تدوس هنا! بلاش يابني
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setClickCount((prev) => prev + 1);
                      if (clickCount >= 4) setStep(step + 1);
                    }}
                    style={{
                      ...neonBtn,
                      background: "#ffd700",
                      color: "#000",
                      border: "none",
                    }}
                  >
                    دوس 5 مرات بسرعة! ({clickCount + 1}/5)
                  </button>
                )}
                <audio ref={audioRef} src={content[step].src} />
              </div>
            )}

            {content[step].type === "math" && (
              <div
                style={{
                  background: "rgba(0,0,0,0.3)",
                  padding: "20px",
                  borderRadius: "15px",
                  border: "1px dashed #00f2ff",
                }}
              >
                <Calculator
                  size={35}
                  color="#00f2ff"
                  style={{ marginBottom: "10px" }}
                />
                <h4 style={{ color: "#ffd700", marginBottom: "10px" }}>
                  حل لفك التشفير: (4 * 4) = ؟
                </h4>
                <input
                  type="number"
                  onChange={(e) => {
                    if (e.target.value === "16") setMathSolved(true);
                  }}
                  placeholder="اكتب الحل.."
                  style={{
                    width: "70%",
                    padding: "12px",
                    borderRadius: "10px",
                    background: "#000",
                    color: "#fff",
                    border: "1px solid #00f2ff",
                    textAlign: "center",
                    fontSize: "1.2rem",
                  }}
                />
                {mathSolved && (
                  <video
                    src={content[step].src}
                    autoPlay
                    controls
                    style={{
                      width: "100%",
                      borderRadius: "15px",
                      marginTop: "15px",
                    }}
                  />
                )}
              </div>
            )}

            {content[step].type === "scan" && (
              <div
                onClick={() => setIsScanned(true)}
                style={{
                  border: "2px dashed #00f2ff",
                  padding: "30px",
                  borderRadius: "15px",
                  cursor: "pointer",
                  background: "rgba(0,242,255,0.05)",
                }}
              >
                {!isScanned ? (
                  <>
                    <Scan
                      size={45}
                      color="#00f2ff"
                      style={{ margin: "0 auto 10px" }}
                    />
                    <p>اضغط لعمل Scan للبروموكود</p>
                  </>
                ) : (
                  <video
                    src={content[step].src}
                    autoPlay
                    controls
                    style={{ width: "100%", borderRadius: "15px" }}
                  />
                )}
              </div>
            )}

            <motion.h3
              animate={{ x: [0, -2, 2, 0] }}
              transition={{ repeat: Infinity, duration: 0.5, repeatDelay: 3 }}
              style={{
                margin: "20px 0",
                fontSize: "20px",
                lineHeight: "1.5",
                textShadow: "1px 1px #ff0055",
              }}
            >
              {content[step].title}
            </motion.h3>

            {content[step].type !== "audio_hold" &&
              (content[step].type !== "math" || mathSolved) && (
                <button
                  onClick={() => {
                    setStep(step + 1);
                    setIsSensitiveVisible(false);
                    setMathSolved(false);
                    setClickCount(0);
                    setIsScanned(false);
                  }}
                  style={neonBtn}
                >
                  {content[step].btn}
                </button>
              )}
          </motion.div>
        )}

        {step === content.length && (
          <motion.div
            key="final"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{ ...glassStyle, maxWidth: "550px" }}
          >
            <video
              autoPlay
              loop
              controls
              style={{
                width: "100%",
                borderRadius: "15px",
                marginBottom: "20px",
                border: "1px solid #ffd700",
              }}
            >
              <source src="https://res.cloudinary.com/dj36afflz/video/upload/v1770742104/%D8%AF%D8%A7_%D8%A7%D9%86%D8%A7_%D9%88%D8%AD%D9%8A%D8%A7%D8%A9_%D8%A7%D9%82%D8%AE%D9%88%D9%87_%D9%85%D9%84%D9%8A%D8%B4_%D8%A7%D9%84%D8%A7_%D9%87%D9%88_sjrivu.mp4" />
            </video>

            <div
              style={{
                background: "rgba(0,242,255,0.1)",
                padding: "15px",
                borderRadius: "15px",
                marginBottom: "20px",
                border: "1px solid #00f2ff",
              }}
            >
              <p
                style={{
                  color: "#00f2ff",
                  fontSize: "20px",
                  marginBottom: "18px",
                }}
              >
                📊 بص تاريخ دا من اول يوم عرفتك فيه لدلوقتي
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "8px",
                  direction: "rtl",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                }}
              >
                <span>{timerData.d} يوم،</span>
                <span>{timerData.h} ساعة،</span>
                <span>{timerData.m} دقيقة،</span>
                <span>{timerData.s} ثانية</span>
              </div>
            </div>

            <div
              style={{
                minHeight: "120px",
                padding: "10px",
                fontSize: "1.1rem",
                color: "#fff",
                textShadow: "0 0 10px #00f2ff",
                lineHeight: "1.8",
              }}
            >
              {textVisible}
            </div>
            <button
              onClick={() => window.location.reload()}
              style={{
                ...neonBtn,
                borderColor: "#d9d904",
                color: "#d9d904",
                marginTop: "20px",
              }}
            >
              هتسيب حلا عشاني؟ (ارجع للبداية)
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MarwanArchive;
