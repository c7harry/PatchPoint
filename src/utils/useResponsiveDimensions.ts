import { useWindowDimensions } from 'react-native';

/**
 * Simple responsive hook that wraps useWindowDimensions and
 * returns a small shape useful across the app.
 */
export const useResponsiveDimensions = () => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  // helpful breakpoint label for layout decisions
  const breakpoint = width >= 1200 ? 'xl' : width >= 900 ? 'lg' : width >= 600 ? 'md' : 'sm';

  return {
    width,
    height,
    isLandscape,
    breakpoint,
  } as const;
};

export type Responsive = ReturnType<typeof useResponsiveDimensions>;
