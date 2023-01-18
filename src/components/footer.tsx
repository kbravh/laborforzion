import {useEffect, useState} from 'react';

export const Footer = () => {
  const [date, setDate] = useState(new Date().getFullYear());

  useEffect(() => {
    setDate(new Date().getFullYear());
  }, []);

  return (
    <footer className="text-slate-700 p-5 text-center">
      © Karey Higuera {date}
    </footer>
  );
};
