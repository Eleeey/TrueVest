"use server";

import PaymentForm from "@/components/shared/PaymentForm";

// import {handleSubmit} from "@/actions/payments"

type Props = {};


const Page = (props: Props) => {

  return (
    <div className="flex  flex-col h-auto gap-5  space-around ">
      <div  className="space-around">


        <PaymentForm />

      </div>
    </div>
  );
};

export default Page;
