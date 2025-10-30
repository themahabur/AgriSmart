"use client";
import { FaLink, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { toast } from "react-hot-toast";

export default function ShareModal({ blog, setShowShareOptions }) {
  const handleShare = async () => {
    const shareUrl = window.location.href;
    const shareText = `${blog?.title} - ${blog?.subtitle || ""}`;

    if (navigator.share) {
      try {
        await navigator.share({ title: blog?.title, text: shareText, url: shareUrl });
      } catch {
        console.log("Share cancelled");
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        toast.success("লিংক কপি করা হয়েছে!");
      } catch {
        const textArea = document.createElement("textarea");
        textArea.value = shareUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        toast.success("লিংক কপি করা হয়েছে!");
      }
    }
    setShowShareOptions(false);
  };

  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
    window.open(url, "_blank", "width=600,height=400");
    setShowShareOptions(false);
  };

  const shareOnTwitter = () => {
    const text = `${blog?.title} - ${blog?.subtitle || ""}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`;
    window.open(url, "_blank", "width=600,height=400");
    setShowShareOptions(false);
  };

  const shareOnLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
    window.open(url, "_blank", "width=600,height=400");
    setShowShareOptions(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg w-80 max-w-sm p-4 relative">
        <button onClick={() => setShowShareOptions(false)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-colors">✕</button>
        <h3 className="text-gray-900 font-medium text-lg mb-4">শেয়ার করুন</h3>
        <div className="space-y-2">
          <button onClick={handleShare} className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded flex items-center gap-3 transition-colors">
            <FaLink className="w-4 h-4 text-gray-600" /> <span className="text-gray-700">লিংক কপি করুন</span>
          </button>
          <button onClick={shareOnFacebook} className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded flex items-center gap-3 transition-colors">
            <FaFacebook className="w-4 h-4 text-blue-600" /> <span className="text-gray-700">Facebook</span>
          </button>
          <button onClick={shareOnTwitter} className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded flex items-center gap-3 transition-colors">
            <FaTwitter className="w-4 h-4 text-sky-500" /> <span className="text-gray-700">Twitter</span>
          </button>
          <button onClick={shareOnLinkedIn} className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded flex items-center gap-3 transition-colors">
            <FaLinkedin className="w-4 h-4 text-blue-700" /> <span className="text-gray-700">LinkedIn</span>
          </button>
        </div>
      </div>
    </div>
  );
}
