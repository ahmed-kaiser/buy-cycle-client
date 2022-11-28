import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CheckOutForm = ({ bookingInfo, setPaymentSuccess, setIsProcessing }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const { price, buyerEmail, sellerEmail, productId } = bookingInfo;

  useEffect(() => {
    fetch(`https://buy-cycle-server.vercel.app/create-payment-intent?email=${buyerEmail}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [price, buyerEmail]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error: cardError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card,
      });

    if (cardError) {
      toast.error(cardError.message);
    }
    // else {
    //   console.log(paymentMethod);
    // }

    const { paymentIntent, error } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            email: buyerEmail,
          },
        },
      }
    );

    if (error) {
      toast.error(error.message);
      return;
    }
    if (paymentIntent.status === "succeeded") {
      const paymentDetails = {
        price,
        buyerEmail,
        bookingId: bookingInfo._id,
        date: new Date(),
        sellerEmail,
        transactionId: paymentIntent.id,
        productId,
      };
      fetch(`https://buy-cycle-server.vercel.app/payments?email=${buyerEmail}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(paymentDetails),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.acknowledged) {
            toast.success("Payment successfully done....");
            setPaymentSuccess({
              status: true,
              transactionId: paymentIntent.id,
            });
            setIsProcessing(false);
          }
        });
    }
  };

  return (
    <form className="max-w-sm" onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="bg-green-500 px-6 py-1 rounded-md font-medium text-white mt-10 w-full"
        type="submit"
        disabled={!stripe}
      >
        Pay
      </button>
    </form>
  );
};

export default CheckOutForm;
