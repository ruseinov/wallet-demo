import classNames from "classnames/bind";
import React from "react";
import { capitalize } from "~/theme/css";
import { Size } from "~/theme/size";
import styles from "./index.scss";
import { calculateMaxWidthBasedOn, Magnitude } from "./magnitudeCalculator";

const cx: any = classNames.bind(styles);

interface Order {
  readonly xs?: number;
  readonly sm?: number;
  readonly md?: number;
  readonly lg?: number;
}

interface Props {
  readonly order?: Order;
  readonly variant?: "row" | "column" | "block";
  readonly margin?: Size;
  readonly padding?: Size;
  readonly overflow?: boolean;
  readonly grow?: boolean;

  readonly start?: "xs" | "sm" | "md" | "lg";
  readonly center?: "xs" | "sm" | "md" | "lg";
  readonly end?: "xs" | "sm" | "md" | "lg";
  readonly top?: "xs" | "sm" | "md" | "lg";
  readonly middle?: "xs" | "sm" | "md" | "lg";
  readonly bottom?: "xs" | "sm" | "md" | "lg";
  readonly around?: "xs" | "sm" | "md" | "lg";
  readonly between?: "xs" | "sm" | "md" | "lg";

  readonly xs?: Magnitude;
  readonly sm?: Magnitude;
  readonly md?: Magnitude;
  readonly lg?: Magnitude;

  readonly maxwidth?: "sm" | "md" | "lg";
  readonly growSm?: Magnitude;
  readonly growMd?: Magnitude;
  readonly growLg?: Magnitude;
  readonly growElem?: React.RefObject<GridItem>;

  readonly xsOffset?: number;
  readonly smOffset?: number;
  readonly mdOffset?: number;
  readonly lgOffset?: number;

  readonly className?: string;
  readonly children: React.ReactNode;
}

interface State {
  readonly viewportWidth: number;
}

class GridItem extends React.PureComponent<Props, State> {
  public readonly state = {
    viewportWidth: 0,
  };
  private readonly divRef = React.createRef<HTMLDivElement>();

  public componentDidMount(): void {
    if (this.props.growElem) {
      this.updateViewport();
      window.addEventListener("resize", this.updateViewport);
    }
  }

  public componentWillUnmount(): void {
    if (this.props.growElem) {
      window.removeEventListener("resize", this.updateViewport);
    }
  }

  public readonly calculateWidth = () => {
    const width = this.divRef && this.divRef.current && this.divRef.current.clientWidth;

    return width ? width : 0;
  };

  public readonly updateViewport = () => {
    this.setState(() => ({ viewportWidth: window.innerWidth }));
  };

  public render(): JSX.Element {
    const {
      children,
      margin,
      variant = "row",
      overflow,
      xs,
      sm,
      md,
      lg,
      start,
      center,
      end,
      top,
      middle,
      bottom,
      around,
      order,
      between,
      xsOffset,
      smOffset,
      mdOffset,
      lgOffset,
      maxwidth,
      growElem,
      growSm,
      growMd,
      growLg,
      padding,
      grow,
      className,
      ...props
    } = this.props;

    const colClassNames: string = cx(
      styles.item,
      capitalize(center, "center"),
      capitalize(start, "start"),
      capitalize(end, "end"),
      capitalize(top, "top"),
      capitalize(middle, "middle"),
      capitalize(bottom, "bottom"),
      capitalize(around, "around"),
      capitalize(between, "between"),
      capitalize(margin, "margin"),
      capitalize(xs, "xs"),
      capitalize(sm, "sm"),
      capitalize(md, "md"),
      capitalize(lg, "lg"),
      capitalize(order ? order.lg : undefined, "orderLg"),
      capitalize(order ? order.md : undefined, "orderMd"),
      capitalize(order ? order.xs : undefined, "orderXs"),
      capitalize(order ? order.sm : undefined, "orderSm"),
      capitalize(xsOffset, "xsOffset"),
      capitalize(smOffset, "smOffset"),
      capitalize(mdOffset, "mdOffset"),
      capitalize(lgOffset, "lgOffset"),
      capitalize(padding, "padding"),
      capitalize(maxwidth, "maxwidth"),
      { overflow },
      { grow },
      variant,
      className,
    );

    let maxWidthStyle;
    if (growElem && growElem.current) {
      const width = growElem.current.calculateWidth();
      maxWidthStyle = calculateMaxWidthBasedOn(
        sm,
        md,
        lg,
        growSm,
        growMd,
        growLg,
        this.state.viewportWidth,
        width,
      );
    }

    return (
      <div ref={this.divRef} className={colClassNames} {...props} style={maxWidthStyle}>
        {children}
      </div>
    );
  }
}

export default GridItem;
