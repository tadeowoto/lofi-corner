export const Greeting = () => {
  let greeting;
  const currentHour = new Date().getHours();
  if (currentHour < 12) {
    greeting = "Buenos Dias";
  } else if (currentHour < 18) {
    greeting = "Buenas Tardes";
  } else {
    greeting = "Buenas Noches";
  }

  return <h1 className="text-4xl">{greeting} 👋</h1>;
};
