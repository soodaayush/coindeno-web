import { default as LoadingImage } from "./../../images/loading.gif";

const Loading = () => {
  return (
    <section className="flex justify-center items-center my-5">
      <img
        src={LoadingImage}
        alt="loading"
        style={{ background: "transparent", height: "50px" }}
      />
    </section>
  );
};

export default Loading;
