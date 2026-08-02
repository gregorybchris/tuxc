import { RunMap } from "../models/runMap";
import { toMercator } from "../utilities/map-utils";

export class ThumbnailGenerator {
  static generate(runMap: RunMap, svg: SVGSVGElement): void {
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }

    const vectors = runMap.points
      .map(toMercator)
      .map((v) => ({ x: v.x, y: -v.y }));

    const minX = Math.min(...vectors.map((v) => v.x));
    const maxX = Math.max(...vectors.map((v) => v.x));
    const minY = Math.min(...vectors.map((v) => v.y));
    const maxY = Math.max(...vectors.map((v) => v.y));
    const width = maxX - minX;
    const height = maxY - minY;

    const padding = width / 1.9;

    const viewBox = `${minX - padding} ${minY - padding} ${width + padding * 2} ${height + padding * 2}`;

    svg.setAttribute("viewBox", viewBox);
    svg.setAttribute("width", `${width}`);
    svg.setAttribute("height", `${height}`);
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");

    svg.style.width = "150px";
    svg.style.height = "100px";
    svg.style.backgroundColor = "#5E4B3C";
    svg.style.borderRadius = "5px";

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute(
      "d",
      vectors.map((v, i) => `${i === 0 ? "M" : "L"}${v.x},${v.y}`).join(" "),
    );

    const strokeWidth = Math.min(height, width) / 12;

    path.style.fill = "none";
    path.style.stroke = "#4B87F7";
    path.style.strokeWidth = `${strokeWidth}px`;
    path.style.strokeLinejoin = "round";
    path.style.strokeLinecap = "round";
    svg.appendChild(path);
  }
}
