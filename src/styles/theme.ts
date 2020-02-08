type ThemeProps = {
  backgroundColor?: string;
  baseSize?: number;
  textColor?: string;
  textColorLight?: string;
};

type Theme = {
  color: {
    background: string;
    text: {
      default: string;
      light: string;
    };
  };
  fontSize: {
    small: number;
    default: number;
    h1: number;
    h2: number;
    h3: number;
  };
  size: {
    tiny: number;
    small: number;
    default: number;
    large: number;
    huge: number;
  };
};

export const theme = ({
  backgroundColor = 'hsl(0, 0%, 21%)',
  baseSize = 14,
  textColor = 'hsl(0, 0%, 64%)',
  textColorLight = 'hsl(0, 0%, 89%)',
}: ThemeProps): Theme => ({
  color: {
    background: backgroundColor,
    text: {
      default: textColor,
      light: textColorLight,
    },
  },
  fontSize: {
    small: baseSize - 2,
    default: baseSize,
    h1: baseSize * 3,
    h2: baseSize * 1.5,
    h3: baseSize,
  },
  size: {
    tiny: baseSize / 4,
    small: baseSize / 2,
    default: baseSize,
    large: baseSize * 2,
    huge: baseSize * 4,
  },
});
