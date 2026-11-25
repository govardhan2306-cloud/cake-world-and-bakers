import { RESTAURANT_INFO } from '../data/restaurant';

export interface CartLineItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  isVeg: boolean;
  categoryId: string;
}

export interface CustomerCheckoutDetails {
  fullName: string;
  phone: string;
  address: string;
  landmark?: string;
  orderNotes?: string;
}

export function buildWhatsAppOrderMessage(
  items: CartLineItem[],
  customer: CustomerCheckoutDetails,
  subtotal: number
): string {
  const orderLines = items
    .map(
      (item, index) =>
        `${index + 1}. ${item.name} x ${item.quantity} = ₹${item.price * item.quantity}`
    )
    .join('\n\n');

  const landmarkValue = customer.landmark?.trim() ? customer.landmark.trim() : 'Not specified';
  const notesValue = customer.orderNotes?.trim() ? customer.orderNotes.trim() : 'None';

  return [
    'Hello Cake World! I would like to place an order.',
    '',
    'CUSTOMER DETAILS',
    '',
    `Name: ${customer.fullName.trim()}`,
    '',
    `Phone: ${customer.phone.trim()}`,
    '',
    `Delivery Address: ${customer.address.trim()}`,
    '',
    `Landmark: ${landmarkValue}`,
    '',
    'ORDER DETAILS',
    '',
    orderLines,
    '',
    `Subtotal: ₹${subtotal}`,
    '',
    'Delivery: Confirmed on WhatsApp',
    '',
    `TOTAL: ₹${subtotal}`,
    '',
    `Order Notes: ${notesValue}`,
    '',
    'Please confirm my order. Thank you!',
  ].join('\n');
}

export function getWhatsAppOrderUrl(
  items: CartLineItem[],
  customer: CustomerCheckoutDetails,
  subtotal: number
): string {
  const message = buildWhatsAppOrderMessage(items, customer, subtotal);
  return `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function getWhatsAppGeneralUrl(customMessage?: string): string {
  const text =
    customMessage ||
    'Hello Cake World! I would like to place an order / enquire about your menu.';
  return `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export function getWhatsAppCakeInquiryUrl(cakeName?: string): string {
  const text = cakeName
    ? `Hello Cake World! I would like to enquire about ordering "${cakeName}". Could you please share available weights, flavours, and pricing?`
    : 'Hello Cake World! I would like to enquire about custom / celebration cakes. Could you please share available options and pricing?';
  return `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
}
