import type { Quotation } from "@/lib/quotation-types";
import { money } from "@/lib/format-money";

export function displayQuotationDate(date: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  return match ? `${match[3]}/${match[2]}/${match[1].slice(-2)}` : date;
}

export async function createQuotationImage(quotation: Quotation): Promise<Blob> {
  const width = 1100, margin = 76, contentWidth = width - margin * 2;
  let logo: HTMLImageElement | null = null;
  try { logo = await loadImage("/images/glossy-jeyya-events-logo.png"); } catch { /* Use the text heading if the logo asset is unavailable. */ }
  let headerFireworks: HTMLImageElement | null = null;
  try { headerFireworks = await loadImage("/images/service-concert-special-effect.png"); } catch { /* Decorative only. */ }
  const bannerTop = 50;
  const bannerWidth = contentWidth * 0.68;
  const bannerX = (width - bannerWidth) / 2;
  const bannerHeight = 232;
  const titleY = bannerTop + bannerHeight + 47;
  const referenceY = titleY + 82;
  const detailsY = referenceY + 68;
  const customerNameY = detailsY + 34;
  const mobileY = customerNameY + 29;
  const addressY = mobileY + 28;
  const itemTextLines = quotation.items.map((item) => wrapText(item.itemName, 405, "600 18px Arial"));
  const rowHeights = itemTextLines.map((lines) => Math.max(56, lines.length * 24 + 24));
  const customerTextX = margin + 20;
  const addressWidth = contentWidth - 40;
  const addressLines = quotation.address ? wrapText(`Address: ${quotation.address}`, addressWidth, "14px Arial").length : 0;
  const headerY = Math.max(addressY + addressLines * 21 + 35, mobileY + 38);
  const tableBottom = headerY + 52 + rowHeights.reduce((sum, height) => sum + height, 0);
  const termsHeight = wrapText(quotation.terms, contentWidth - 52, "17px Arial").length * 26;
  const canvasHeight = Math.max(1420, tableBottom + 400 + (quotation.gstRate > 0 ? 83 : 0) + termsHeight);
  const canvas = document.createElement("canvas"); canvas.width = width; canvas.height = canvasHeight;
  const ctx = canvas.getContext("2d"); if (!ctx) throw new Error("Could not create the quotation image.");
  ctx.fillStyle = "#f7f1e6"; ctx.fillRect(0, 0, width, canvasHeight);
  ctx.fillStyle = "#fffdf8"; roundedRect(ctx, 30, 30, width - 60, canvasHeight - 60, 12); ctx.fill();
  ctx.fillStyle = "#b78a26"; ctx.fillRect(30, 30, width - 60, 8);
  if (bannerHeight > 0) {
    if (headerFireworks) drawHeaderBackdrop(ctx, headerFireworks, margin, bannerTop, contentWidth, bannerHeight, bannerX, bannerWidth);
    ctx.save();
    ctx.shadowColor = "rgba(74, 31, 25, 0.12)"; ctx.shadowBlur = 18; ctx.shadowOffsetY = 5;
    ctx.fillStyle = "#fffdf8"; roundedRect(ctx, bannerX, bannerTop, bannerWidth, bannerHeight, 30); ctx.fill();
    ctx.restore();
    ctx.strokeStyle = "#d0a33f"; ctx.lineWidth = 2; roundedRect(ctx, bannerX + 1, bannerTop + 1, bannerWidth - 2, bannerHeight - 2, 29); ctx.stroke();
  }
  if (logo) {
    const logoWidth = Math.min(bannerWidth * 0.64, 430);
    const logoHeight = logoWidth * logo.height / logo.width;
    ctx.drawImage(logo, (width - logoWidth) / 2, bannerTop + (bannerHeight - logoHeight) / 2, logoWidth, logoHeight);
  }
  else { ctx.textAlign = "center"; ctx.fillStyle = "#5a1f25"; ctx.font = "700 30px Arial"; ctx.fillText("JEYYA EVENTS", width / 2, bannerTop + 42); }
  ctx.strokeStyle = "#e8decc"; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(margin, bannerTop + bannerHeight + 14); ctx.lineTo(width - margin, bannerTop + bannerHeight + 14); ctx.stroke();
  ctx.strokeStyle = "#d0a33f"; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(width / 2 - 170, titleY - 11); ctx.lineTo(width / 2 - 120, titleY - 11); ctx.moveTo(width / 2 + 120, titleY - 11); ctx.lineTo(width / 2 + 170, titleY - 11); ctx.stroke();
  ctx.textAlign = "center"; ctx.fillStyle = "#5a1f25"; ctx.font = "700 34px Arial"; ctx.fillText("QUOTATION", width / 2, titleY);
  ctx.fillStyle = "#8b8174"; ctx.font = "15px Arial"; ctx.fillText("EVENT PROPOSAL", width / 2, titleY + 24);
  const dateCardWidth = 225;
  ctx.fillStyle = "#f8f4ec"; roundedRect(ctx, margin, referenceY - 28, dateCardWidth, 60, 6); ctx.fill();
  ctx.textAlign = "left"; ctx.fillStyle = "#a67c1a"; ctx.font = "700 11px Arial"; ctx.fillText("DATE", margin + 16, referenceY - 10);
  ctx.fillStyle = "#302b25"; ctx.font = "600 17px Arial"; ctx.fillText(displayQuotationDate(quotation.date), margin + 16, referenceY + 16);
  ctx.fillStyle = "#fcfaf5"; roundedRect(ctx, margin, detailsY - 25, contentWidth, headerY - detailsY + 4, 6); ctx.fill();
  ctx.strokeStyle = "#eee5d6"; ctx.lineWidth = 1; ctx.stroke();
  ctx.fillStyle = "#d0a33f"; ctx.fillRect(margin, detailsY - 25, 3, headerY - detailsY + 4);
  ctx.textAlign = "left"; ctx.fillStyle = "#8e6b21"; ctx.font = "700 12px Arial"; ctx.fillText("PREPARED FOR", customerTextX, detailsY);
  ctx.fillStyle = "#5a1f25"; ctx.font = "700 21px Arial"; ctx.fillText(quotation.customerName, customerTextX, customerNameY);
  ctx.fillStyle = "#655e54"; ctx.font = "15px Arial"; ctx.fillText(`Mobile: ${quotation.mobile}`, customerTextX, mobileY);
  if (quotation.address) drawWrapped(ctx, `Address: ${quotation.address}`, customerTextX, addressY, addressWidth, "14px Arial", "#655e54", 21);
  ctx.fillStyle = "#5a1f25"; roundedRect(ctx, margin, headerY, contentWidth, 52, 6); ctx.fill();
  ctx.fillStyle = "#fffaf0"; ctx.font = "600 15px Arial"; ctx.textAlign = "left"; ctx.fillText("ITEM DESCRIPTION", margin + 20, headerY + 33); ctx.textAlign = "center"; ctx.fillText("QTY", 670, headerY + 33); ctx.textAlign = "right"; ctx.fillText("UNIT PRICE", 835, headerY + 33); ctx.fillText("AMOUNT", width - margin - 20, headerY + 33);
  let y = headerY + 52;
  quotation.items.forEach((item, index) => {
    const height = rowHeights[index]; ctx.fillStyle = index % 2 ? "#fffdf8" : "#f9f5ed"; ctx.fillRect(margin, y, contentWidth, height);
    const itemTextY = y + (height - itemTextLines[index].length * 24) / 2 + 18;
    drawWrapped(ctx, item.itemName, margin + 20, itemTextY, 405, "600 18px Arial", "#302b25", 24);
    const valueY = y + height / 2 + 6;
    ctx.textAlign = "center"; ctx.font = "17px Arial"; ctx.fillStyle = "#655e54"; ctx.fillText(String(item.quantity), 670, valueY);
    ctx.textAlign = "right"; ctx.fillText(money(item.unitPrice), 835, valueY); ctx.fillStyle = "#5a1f25"; ctx.font = "600 17px Arial"; ctx.fillText(money(item.total), width - margin - 20, valueY);
    ctx.strokeStyle = "#eee7da"; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(margin, y + height); ctx.lineTo(width - margin, y + height); ctx.stroke(); y += height;
  });
  ctx.strokeStyle = "#e8decc"; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(margin, y); ctx.lineTo(width - margin, y); ctx.stroke(); y += 26;
  if (quotation.gstRate > 0) {
    ctx.textAlign = "left"; ctx.fillStyle = "#655e54"; ctx.font = "18px Arial"; ctx.fillText("Subtotal", margin + 20, y + 22);
    ctx.textAlign = "right"; ctx.fillText(money(quotation.subtotal), width - margin - 20, y + 22); y += 39;
    ctx.textAlign = "left"; ctx.fillText(`GST (${quotation.gstRate}%)`, margin + 20, y + 22);
    ctx.textAlign = "right"; ctx.fillText(money(quotation.gstAmount), width - margin - 20, y + 22); y += 44;
  }
  ctx.fillStyle = "#5a1f25"; roundedRect(ctx, margin, y, contentWidth, 58, 8); ctx.fill(); ctx.textAlign = "left"; ctx.fillStyle = "#fffaf0"; ctx.font = "700 17px Arial"; ctx.fillText("GRAND TOTAL", margin + 20, y + 36); ctx.textAlign = "right"; ctx.font = "700 23px Arial"; ctx.fillText(money(quotation.total), width - margin - 20, y + 37); y += 96;
  ctx.fillStyle = "#f8f4ec"; roundedRect(ctx, margin, y, contentWidth, termsHeight + 58, 6); ctx.fill();
  ctx.fillStyle = "#b78a26"; ctx.fillRect(margin, y, 4, termsHeight + 58);
  ctx.textAlign = "left"; ctx.fillStyle = "#a67c1a"; ctx.font = "700 16px Arial"; ctx.fillText("TERMS & CONDITIONS", margin + 22, y + 26);
  drawWrapped(ctx, quotation.terms, margin + 22, y + 52, contentWidth - 52, "17px Arial", "#71675a", 26); y += termsHeight + 100;
  ctx.strokeStyle = "#b78a26"; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(width - margin - 250, y); ctx.lineTo(width - margin, y); ctx.stroke(); ctx.fillStyle = "#655e54"; ctx.font = "16px Arial"; ctx.textAlign = "right"; ctx.fillText("Authorized signature", width - margin, y + 28);
  return new Promise((resolve, reject) => canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("Could not export the quotation image.")), "image/png"));
}

export async function downloadQuotationImage(quotation: Quotation) {
  const blob = await createQuotationImage(quotation), url = URL.createObjectURL(blob), link = document.createElement("a"); link.href = url; link.download = `${quotation.number}.png`; link.click(); URL.revokeObjectURL(url);
}

function roundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); }
function drawHeaderBackdrop(ctx: CanvasRenderingContext2D, image: HTMLImageElement, x: number, y: number, width: number, height: number, panelX: number, panelWidth: number) {
  ctx.save();
  ctx.beginPath(); ctx.rect(x, y, width, height); ctx.clip();
  const scale = Math.max(width / image.width, height / image.height);
  const drawWidth = image.width * scale, drawHeight = image.height * scale;
  ctx.globalAlpha = 0.92;
  ctx.drawImage(image, x + (width - drawWidth) / 2, y + (height - drawHeight) / 2, drawWidth, drawHeight);
  ctx.globalAlpha = 1;
  const sideWidth = panelX - x;
  const leftFade = ctx.createLinearGradient(x, y, panelX, y);
  leftFade.addColorStop(0, "rgba(255,253,248,0)"); leftFade.addColorStop(1, "rgba(255,253,248,0.48)");
  ctx.fillStyle = leftFade; ctx.fillRect(x, y, sideWidth, height);
  const rightX = panelX + panelWidth;
  const rightFade = ctx.createLinearGradient(rightX, y, x + width, y);
  rightFade.addColorStop(0, "rgba(255,253,248,0.48)"); rightFade.addColorStop(1, "rgba(255,253,248,0)");
  ctx.fillStyle = rightFade; ctx.fillRect(rightX, y, sideWidth, height);
  ctx.restore();
}
function loadImage(src: string) { return new Promise<HTMLImageElement>((resolve, reject) => { const image = new Image(); image.onload = () => resolve(image); image.onerror = reject; image.src = src; }); }
function wrapText(text: string, maxWidth: number, font: string) { const canvas = document.createElement("canvas"), ctx = canvas.getContext("2d")!; ctx.font = font; const lines: string[] = []; for (const paragraph of text.split(/\r?\n/)) { if (!paragraph.trim()) { lines.push(""); continue; } let line = ""; for (const word of paragraph.split(/\s+/)) { const candidate = line ? `${line} ${word}` : word; if (line && ctx.measureText(candidate).width > maxWidth) { lines.push(line); line = word; } else line = candidate; } if (line) lines.push(line); } return lines; }
function drawWrapped(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, font: string, color: string, lineHeight: number) { ctx.font = font; ctx.fillStyle = color; ctx.textAlign = "left"; const lines = wrapText(text, maxWidth, font); lines.forEach((line, index) => ctx.fillText(line, x, y + index * lineHeight)); return lines.length * lineHeight; }
