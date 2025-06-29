type Button = {
  children: React.ReactNode;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  fontWeight?: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
};


export default function Button({
  children,
  bgColor = '#EDCD50',
  textColor = '#1E1E1E',
  borderColor = '#1E1E1E',
  fontWeight = 'font-semibold',
  width,
  height,
  onClick,
}: Button) {
  return (
    <button
      onClick={onClick}
      className={`
        ${fontWeight}
        border-[1px]
        rounded-lg
        px-6 py-2
        transform transition-transform duration-200 hover:scale-105
        shadow-[0.5px_1.5px_0_rgba(30,30,30,1)]
      `}
      style={{
        backgroundColor: bgColor,
        color: textColor,
        borderColor: borderColor,
        width: width === 'full' ? '100%' : width,
        height: height === 'full' ? '100%' : height,
      }}
    >
      {children}
    </button>
  );
}
