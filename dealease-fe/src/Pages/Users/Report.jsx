import { CustomList } from "../../Components/List/CustomList";
import ImageIcon from "@rsuite/icons/legacy/Image";
import FilmIcon from "@rsuite/icons/legacy/Film";

export function ReportUser() {
  const title = "Report User";

  const data = [
    {
      title: "Hong Kong Free Walk @ Tsim Sha Tsui",
      icon: <ImageIcon />,
      creator: "Yvnonne",
      date: "2017.10.13 14:50",
      peak: 3223,
      peakRaise: 433,
      uv: 433,
      uvRaise: 33,
    },
    {
      title: "Celebrate Mid-Autumn Festival",
      icon: <ImageIcon />,
      creator: "Daibiao",
      date: "2017.10.13 14:50",
      peak: 3223,
      peakRaise: 238,
      uv: 238,
      uvRaise: 28,
    },
    {
      title: "Live basketball",
      icon: <FilmIcon />,
      creator: "Bidetoo",
      date: "2017.10.13 14:50",
      peak: 4238,
      peakRaise: -239,
      uv: 239,
      uvRaise: 29,
    },
    {
      title: "Legislative Yuan meeting live",
      icon: <FilmIcon />,
      creator: "Yvnonne",
      date: "2017.10.13 14:50",
      peak: 4238,
      peakRaise: 2321,
      uv: 921,
      uvRaise: 91,
    },
    {
      title: "Iwank Patch",
      icon: <ImageIcon />,
      creator: "Tony",
      date: "2017.10.13 14:50",
      peak: 2321,
      peakRaise: 1321,
      uv: 321,
      uvRaise: 132,
    },
  ];

  return <CustomList title={title} data={data} />;
}
