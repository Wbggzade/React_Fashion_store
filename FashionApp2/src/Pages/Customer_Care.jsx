

import React from 'react';
import styles from './CustomerCare.module.css';

const CustomerCare = () => {
  const supportCards = [
    {
      title: 'Shipping Information',
      description: 'Learn about our shipping options, delivery times, and tracking your orders.'
    },
    {
      title: 'Returns & Exchanges',
      description: 'Easy returns within 30 days. Free exchanges on all items.'
    },
    {
      title: 'Payment Methods',
      description: 'Secure payment options including credit cards, PayPal, and more.'
    },
    {
      title: 'Contact Support',
      description: 'Get in touch with our customer service team for any questions.'
    }
  ];

  const faqs = [
    {
      question: 'How long does shipping take?',
      answer: 'Standard shipping takes 3-5 business days. Express shipping is available for 1-2 business days.'
    },
    {
      question: 'Can I return sale items?',
      answer: 'Yes, sale items can be returned within 30 days of purchase, provided they are in original condition.'
    },
    {
      question: 'How can I track my order?',
      answer: 'You will receive a tracking number via email once your order ships. Use it on our website or the carrier\'s site.'
    },
    {
      question: 'What payment methods are accepted?',
      answer: 'We accept Visa, MasterCard, American Express, PayPal, and Apple Pay for secure transactions.'
    }
  ];

  return (
    <div className={styles.customerCarePage}>
      <section className={styles.hero}>
        <h1>Customer Care</h1>
        <p>We're here to help with all your fashion needs</p>
        <div className={styles.accentLine}></div>
      </section>

      <section className={styles.supportCards}>
        {supportCards.map((card, index) => (
          <div key={index} className={styles.supportCard}>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </div>
        ))}
      </section>

      <section className={styles.faq}>
        <h2>Frequently Asked Questions</h2>
        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <div key={index} className={styles.faqItem}>
              <h4>{faq.question}</h4>
              <p>{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.contact}>
        <h2>Contact Us</h2>
        <div className={styles.contactInfo}>
          <p><strong>Email:</strong> support@fashionstore.com</p>
          <p><strong>Phone:</strong> 1-800-FASHION</p>
          <p><strong>Business Hours:</strong> Mon-Fri 9AM-6PM EST</p>
        </div>
        <button className={styles.contactBtn}>Get in Touch</button>
      </section>
    </div>
  );
};

export default CustomerCare;
