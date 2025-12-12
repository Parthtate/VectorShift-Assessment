import { RiDraggable } from "react-icons/ri";

export const DraggableNode = ({ type, label, icon = <RiDraggable /> }) => {
  const onDragStart = (event) => {
    const appData = { nodeType: type };
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
  };

  return (
    <div
      draggable
      onDragStart={onDragStart}
      className={`
        relative overflow-hidden group
        flex flex-col items-center justify-center gap-2
        p-3 h-24 rounded-xl cursor-grab active:cursor-grabbing
        bg-white border border-slate-200
        hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-0.5
        transition-all duration-300 ease-out
      `}
    >
      {/* Icon Container with subtle background */}
      <div className="
        w-10 h-10 rounded-lg bg-slate-50 text-slate-600
        flex items-center justify-center text-xl
        group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:scale-110
        transition-all duration-300
      ">
        {icon}
      </div>
      
      <span className="text-xs font-semibold text-slate-600 group-hover:text-slate-900 transition-colors">
        {label}
      </span>

      {/* Hover Indicator */}
      <div className="absolute top-0 right-0 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
      </div>
    </div>
  );
};
