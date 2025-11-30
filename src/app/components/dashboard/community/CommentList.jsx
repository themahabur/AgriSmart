import { format } from "date-fns"; // npm install date-fns

export const CommentList = ({ comments }) => {
  if (!comments || comments.length === 0) {
    return (
      <p className="mt-6 text-center text-gray-500">
        No comments yet. Be the first to comment!
      </p>
    );
  }

  return (
    <div className="mt-6 space-y-8">
      {comments.map((comment) => (
        <div key={comment._id} className="flex items-start space-x-4">
          <img
            src={comment.author?.avatar || "/default-avatar.png"}
            alt={comment.author?.name}
            className="h-10 w-10 rounded-full"
          />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-900">
              {comment.author?.name}
            </p>
            <p className="mt-1 text-sm text-gray-700">{comment.content}</p>
            <p className="mt-1 text-xs text-gray-500">
              {format(new Date(comment.createdAt), "MMM d, yyyy")}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default CommentList;
