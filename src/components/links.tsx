type HoverUnderlineProps = {
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
};

export const HoverUnderline: React.FC<HoverUnderlineProps> = ({ children, className }) => (
  <span className={`cursor-pointer transition-all motion-reduce:transition-none duration-300 bg-left-bottom bg-gradient-to-br from-emerald-900 to-emerald-500 bg-hidden-link hover:bg-shown-link bg-no-repeat ${className ?? ''}`}>{children}</span>
);
