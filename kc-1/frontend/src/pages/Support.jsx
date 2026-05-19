import { useState } from 'react';

import AppLayout from '../components/AppLayout';

import {
  useForm,
  ValidationError,
} from '@formspree/react';

const emptyTicket = {
  subject: '',
  category: 'orders',
  message: '',
};

export default function Support() {

  const [form, setForm] = useState(emptyTicket);

  const [state, handleSubmit] = useForm('xkoydkpj');

  if (state.succeeded) {

    return (

      <AppLayout
        title="Support"
        subtitle="Your message has been delivered successfully."
      >

        <div className="kc-form-panel">

          <h2>
            Ticket Submitted ✅
          </h2>

          <p>
            Our support team will contact you soon.
          </p>

        </div>

      </AppLayout>
    );
  }

  return (

    <AppLayout
      title="Support"
      subtitle="Raise issues and contact support instantly."
    >

      <section className="kc-two-column">

        <div className="kc-form-panel">

          <h2>Create Ticket</h2>

          <form
            className="kc-modern-form"
            onSubmit={handleSubmit}
          >

            <label>

              Subject

              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={(event) =>
                  setForm({
                    ...form,
                    subject: event.target.value,
                  })
                }
                required
              />

            </label>

            <ValidationError
              prefix="Subject"
              field="subject"
              errors={state.errors}
            />

            <label>

              Category

              <select
                name="category"
                value={form.category}
                onChange={(event) =>
                  setForm({
                    ...form,
                    category: event.target.value,
                  })
                }
              >

                <option value="orders">
                  Orders
                </option>

                <option value="payments">
                  Payments
                </option>

                <option value="products">
                  Products
                </option>

                <option value="account">
                  Account
                </option>

                <option value="other">
                  Other
                </option>

              </select>

            </label>

            <label>

              Message

              <textarea
                name="message"
                value={form.message}
                onChange={(event) =>
                  setForm({
                    ...form,
                    message: event.target.value,
                  })
                }
                required
              />

            </label>

            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
            />

            <button
              className="kc-premium-btn"
              type="submit"
              disabled={state.submitting}
            >

              {state.submitting
                ? 'Submitting...'
                : 'Submit Ticket'}

            </button>

          </form>

        </div>

      </section>

    </AppLayout>
  );
}