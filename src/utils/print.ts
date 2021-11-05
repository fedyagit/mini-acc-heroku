import path from "path";
import { jsPDF } from "jspdf";
import open from "open";
import "../fonts/typewriter";

export const Sf = async () => {
  var doc = new jsPDF("p", "mm", [58, 210]);
  doc.setFont("TypeWriter");
  let step = 10;
  doc.setFontSize(12);
  doc.text("СМАЧНА ЗУСТРІЧ", 29, step, {
    align: "center",
  });
  doc.text("################", 29, (step += 4), { align: "center" });
  doc.text("Торт. Вишн.", 2, (step += 4));
  doc.text("1040.00х0.1=1005.00", 56, (step += 4), { align: "right" });
  doc.text("Кофе. Якобс.", 2, (step += 4));
  doc.text("40.00х0.1=4.00", 56, (step += 4), { align: "right" });
  doc.text("Торт. Вишн.", 2, (step += 4));
  doc.text("1040.00х0.1=1005.00", 56, (step += 4), { align: "right" });
  doc.text("Кофе. Якобс.", 2, (step += 4));
  doc.text("40.00х0.1=4.00", 56, (step += 4), { align: "right" });

  const now = new Date();
  const name = `check-${now.getFullYear()}-${now.getMonth()}-${now.getDay()}_${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}`;
  const checkPath = path.resolve(`checks/${name}.pdf`);
  doc.save(checkPath);
  open(checkPath);
};
