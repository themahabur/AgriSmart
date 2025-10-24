import { FiYoutube } from "react-icons/fi";

const VideoUrlInput = ({ value, onChange }) => {
  return (
    <div className="mb-6">
      <label
        htmlFor="youtubeUrl"
        className="block text-sm font-medium font-hind text-gray-700 mb-2"
      >
        ইউটিউব ভিডিওর আইডি দিন (YouTube Video Id)
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <FiYoutube className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <input
          type="text"
          id="youtubeUrl"
          name="youtubeUrl"
          value={value}
          onChange={onChange}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition text-lg font-hind"
          placeholder="vB30Y_7lNaI..."
        />
      </div>
    </div>
  );
};

export default VideoUrlInput;
