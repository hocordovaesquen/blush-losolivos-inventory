import React, { useState, useEffect } from 'react';
import { Search, Minus, Package, AlertTriangle, TrendingDown, Save, BarChart3, Users, Download, Calendar } from 'lucide-react';

export default function SalonInventoryTracker() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [consumptionML, setConsumptionML] = useState('');
  const [stylistName, setStylistName] = useState('');
  const [activeTab, setActiveTab] = useState('inventory');
  const [consumptionHistory, setConsumptionHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Guardar datos en localStorage automáticamente
  useEffect(() => {
    if (consumptionHistory.length > 0) {
      localStorage.setItem('consumptionHistory', JSON.stringify(consumptionHistory));
    }
  }, [consumptionHistory]);

  useEffect(() => {
    if (products.length > 0) {
      const productsWithConsumption = products.map(p => ({
        id: p.id,
        sku: p.sku,
        consumedML: p.consumedML
      }));
      localStorage.setItem('productsConsumption', JSON.stringify(productsWithConsumption));
    }
  }, [products]);

  useEffect(() => {
    const loadInventory = async () => {
      try {
        // Cargar datos reales embebidos
        const inventoryData = generateDemoData();
        
        // Restaurar historial de consumos desde localStorage
        const savedHistory = localStorage.getItem('consumptionHistory');
        if (savedHistory) {
          setConsumptionHistory(JSON.parse(savedHistory));
        }
        
        // Restaurar consumos por producto desde localStorage
        const savedConsumption = localStorage.getItem('productsConsumption');
        if (savedConsumption) {
          const consumptionMap = JSON.parse(savedConsumption);
          const restoredProducts = inventoryData.map(product => {
            const saved = consumptionMap.find(c => c.sku === product.sku);
            if (saved && saved.consumedML > 0) {
              return {
                ...product,
                consumedML: saved.consumedML,
                availableML: product.totalML - saved.consumedML
              };
            }
            return product;
          });
          setProducts(restoredProducts);
          setFilteredProducts(restoredProducts);
        } else {
          setProducts(inventoryData);
          setFilteredProducts(inventoryData);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error:', err);
        setLoading(false);
      }
    };

    loadInventory();
  }, []);

  const generateDemoData = () => {
    // DATOS REALES: 351 productos del inventario
    // Formato: [id, name, sku, units, capacityML, price]
    const RAW_DATA = [[1,"Dia light","SKEXKT0461",1,null,0],[2,"Dialight","SKEXKT0462",1,null,0],[3,"INOA","SKEXKT0470",2,null,0],[4,"Ino","SKEXKT0472",2,null,0],[5,"Inoa","SKEXKT0473",2,null,0],[6,"LOREAL INOA 4.0","SKEXKT0438",1,60,20],[7,"LOREAL INOA 5.3","SKEXKT0440",3,60,20],[8,"LOREAL INOA 5.32","SKEXKT0457",2,60,20],[9,"LOREAL INOA 5.35","SKEXKT0444",2,60,20],[10,"LOREAL INOA 5.4","SKEXKT0442",1,60,20],[11,"LOREAL INOA 5.60","SKEXKT0443",2,60,20],[12,"LOREAL INOA 6.0","SKEXKT0458",1,60,20],[13,"LOREAL INOA 6.23","SKEXKT0445",2,60,20],[14,"LOREAL INOA 6.3","SKEXKT0452",3,60,20],[15,"LOREAL INOA 6.32","SKEXKT0439",2,60,20],[16,"LOREAL INOA 6.34","SKEXKT0451",1,60,20],[17,"LOREAL INOA 6.45","SKEXKT0453",2,60,20],[18,"LOREAL INOA 6.46","SKEXKT0459",2,60,20],[19,"LOREAL INOA 6.66","SKEXKT0455",2,60,20],[20,"LOREAL INOA 7.0","SKEXKT0448",3,60,20],[21,"LOREAL INOA 7.1","SKEXKT0460",3,60,20],[22,"LOREAL INOA 7.13","SKEXKT0435",2,60,20],[23,"LOREAL INOA 7.23","SKEXKT0446",1,60,20],[24,"LOREAL INOA 7.3","SKEXKT0447",3,60,20],[25,"LOREAL INOA 7.31","SKEXKT0437",2,60,20],[26,"LOREAL INOA 7.43","SKEXKT0449",2,60,20],[27,"LOREAL INOA 7.8","SKEXKT0454",3,60,20],[28,"LOREAL INOA 8.23","SKEXKT0450",2,60,20],[29,"LOREAL INOA 9.13","SKEXKT0436",2,60,20],[30,"Shampoo  Resur Rection1","SKEXKT0466",1,null,0],[31,"TINTE KUUL COLOR 000","SKEXKT0370",5,90,20],[32,"TINTE KUUL COLOR 1","SKEXKT0377",6,90,20],[33,"TINTE KUUL COLOR 10","SKEXKT0389",1,90,20],[34,"TINTE KUUL COLOR 10.1","SKEXKT0388",2,90,20],[35,"TINTE KUUL COLOR 10.11","SKEXKT0386",3,90,20],[36,"TINTE KUUL COLOR 10.22","SKEXKT0387",4,90,20],[37,"TINTE KUUL COLOR 10.31","SKEXKT0395",4,90,20],[38,"TINTE KUUL COLOR 1A","SKEXKT0400",6,90,20],[39,"TINTE KUUL COLOR 1V","SKEXKT0378",6,90,20],[40,"TINTE KUUL COLOR 2","SKEXKT0379",6,90,20],[41,"TINTE KUUL COLOR 3","SKEXKT0354",6,90,20],[42,"TINTE KUUL COLOR 4","SKEXKT0355",1,90,20],[43,"TINTE KUUL COLOR 4.65","SKEXKT0390",5,90,0],[44,"TINTE KUUL COLOR 5","SKEXKT0356",1,90,20],[45,"TINTE KUUL COLOR 5.1","SKEXKT0357",3,90,20],[46,"TINTE KUUL COLOR 5.31","SKEXKT0403",1,90,20],[47,"TINTE KUUL COLOR 5.31","SKEXKT0399",2,90,20],[48,"TINTE KUUL COLOR 6.1","SKEXKT0358",4,90,20],[49,"TINTE KUUL COLOR 6.12","SKEXKT0396",4,90,20],[50,"TINTE KUUL COLOR 6.34","SKEXKT0359",3,90,20],[51,"TINTE KUUL COLOR 6.66","SKEXKT0392",5,90,20],[52,"TINTE KUUL COLOR 7","SKEXKT0360",1,90,20],[53,"TINTE KUUL COLOR 7.1","SKEXKT0361",0,90,20],[54,"TINTE KUUL COLOR 7.11","SKEXKT0362",1,90,20],[55,"TINTE KUUL COLOR 7.12","SKEXKT0393",2,90,20],[56,"TINTE KUUL COLOR 7.35","SKEXKT0363",2,90,20],[57,"TINTE KUUL COLOR 7.44","SKEXKT0364",0,90,20],[58,"TINTE KUUL COLOR 7.62","SKEXKT0397",4,90,20],[59,"TINTE KUUL COLOR 7.64","SKEXKT0398",5,90,20],[60,"TINTE KUUL COLOR 7.64","SKEXKT0402",3,90,20],[61,"TINTE KUUL COLOR 7.66","SKEXKT0405",6,90,20],[62,"TINTE KUUL COLOR 7.66","SKEXKT0401",4,90,20],[63,"TINTE KUUL COLOR 8","SKEXKT0365",4,90,20],[64,"TINTE KUUL COLOR 8.1","SKEXKT0366",5,90,20],[65,"TINTE KUUL COLOR 8.22","SKEXKT0367",3,90,20],[66,"TINTE KUUL COLOR 8.62","SKEXKT0394",6,90,20],[67,"TINTE KUUL COLOR 8.66","SKEXKT0381",6,90,20],[68,"TINTE KUUL COLOR 9","SKEXKT0369",5,90,20],[69,"TINTE KUUL COLOR 9.1","SKEXKT0380",5,90,20],[70,"TINTE KUUL COLOR 9.11","SKEXKT0382",4,90,20],[71,"TINTE KUUL COLOR 9.12","SKEXKT0376",1,90,20],[72,"TINTE KUUL COLOR 9.66","SKEXKT0383",6,90,20],[73,"TINTE KUUL COLOR 9.9","SKEXKT0384",3,90,20],[74,"TINTE KUUL COLOR 902","SKEXKT0385",1,90,20],[75,"TINTE KUUL COLOR AMARILLO NEON","SKEXKT0409",6,90,20],[76,"TINTE KUUL COLOR AZUL","SKEXKT0410",5,90,20],[77,"TINTE KUUL COLOR AZUL CELESTE","SKEXKT0411",6,90,20],[78,"TINTE KUUL COLOR AZUL JEANS","SKEXKT0412",6,90,20],[79,"TINTE KUUL COLOR AZUL METALICO","SKEXKT0413",6,90,20],[80,"TINTE KUUL COLOR AZUL NEON","SKEXKT0414",5,90,20],[81,"TINTE KUUL COLOR AZUL OCEANO 90 ML","SKEXKT0415",5,90,20],[82,"TINTE KUUL COLOR BLANCO TITANIO","SKEXKT0416",5,90,20],[83,"TINTE KUUL COLOR BUGAMBILIA","SKEXKT0434",6,90,0],[84,"TINTE KUUL COLOR CORAL","SKEXKT0417",6,90,20],[85,"TINTE KUUL COLOR MAGENTA","SKEXKT0418",2,90,20],[86,"TINTE KUUL COLOR NARANJA","SKEXKT0419",6,90,20],[87,"TINTE KUUL COLOR PLATA 90ML","SKEXKT0420",1,90,20],[88,"TINTE KUUL COLOR PLATINADO METALICO","SKEXKT0421",6,90,20],[89,"TINTE KUUL COLOR REFLECTS COBRE","SKEXKT0422",3,90,20],[90,"TINTE KUUL COLOR REFLECTS DORADO COBRIZO","SKEXKT0423",4,90,20],[91,"TINTE KUUL COLOR REFLECTS RED","SKEXKT0424",3,90,20],[92,"TINTE KUUL COLOR REFLECTS VIOLETA","SKEXKT0425",4,90,20],[93,"TINTE KUUL COLOR REFLECTS VIOLETA ROJO","SKEXKT0426",1,90,20],[94,"TINTE KUUL COLOR ROJO","SKEXKT0406",6,90,20],[95,"TINTE KUUL COLOR ROJO ROSADO","SKEXKT0427",6,90,20],[96,"TINTE KUUL COLOR ROJO VIOLETA","SKEXKT0407",6,90,20],[97,"TINTE KUUL COLOR ROSA","SKEXKT0428",6,90,20],[98,"TINTE KUUL COLOR ROSA METALICO","SKEXKT0429",6,90,20],[99,"TINTE KUUL COLOR ROSA NEON","SKEXKT0430",6,90,20],[100,"TINTE KUUL COLOR VERDE NEON","SKEXKT0431",6,90,20],[101,"TINTE KUUL COLOR VERDE PERA","SKEXKT0408",6,90,20],[102,"TINTE KUUL COLOR VIOLETA","SKEXKT0432",6,90,20],[103,"TINTE KUUL COLOR VIOLETA NEON","SKEXKT0433",5,90,20],[104,"TINTE KUUL COLOR cromo corrector","SKEXKT0375",6,90,20],[105,"TINTE KUUL COLOR plata 60 ml","SKEXKT0372",6,60,20],[106,"TINTE KUUL COLOR verde","SKEXKT0374",6,90,20],[107,"TINTE KUUL COLOR verde esmeralda 60 ml","SKEXKT0373",4,60,20],[108,"TINTE KUUL COLOR verde esmeralda 90 ml","SKEXKT0371",1,90,20],[109,"TNTE KUUL COLOR 8.11","SKEXKT0368",4,90,0],[110,"Tigi  Treat me Right","SKEXKT0469",2,null,0],[111,"Tigi after party","SKEXKT0464",4,null,0],[112,"Tigi bed hea","SKEXKT0468",2,null,0],[113,"Tigi curis rock","SKEXKT0467",2,null,0],[114,"Tigi curls rock amplifier","SKEXKT0465",2,null,0],[115,"Tigi small talk","SKEXKT0463",2,null,0],[116,"in","SKEXKT0471",1,null,0],[117,"CGO 10AV - 10.12","SKEXKT0677",2,60,20],[118,"CGO 5GB - 5.31","SKEXKT0585",4,60,23.09],[119,"CGO 5NN - 5.00","SKEXKT0586",4,60,23.1],[120,"CGO 6AB - 6.1","SKEXKT0663",2,60,20],[121,"CGO 6G - 6.3","SKEXKT0664",2,60,20],[122,"CGO 6G - 6.3","SKEXKT0587",2,60,23.09],[123,"CGO 6N - 6.0","SKEXKT0588",4,60,23.09],[124,"CGO 6NA - 6.01","SKEXKT0665",2,60,20],[125,"CGO 6NCH - 6.15","SKEXKT0666",2,60,20],[126,"CGO 7CC - 7.44","SKEXKT0589",2,60,23.09],[127,"CGO 7GB - 7.31","SKEXKT0590",4,60,23.09],[128,"CGO 7NCH - 7.15","SKEXKT0591",4,60,23.09],[129,"CGO 7NN - 7.00","SKEXKT0667",2,60,20],[130,"CGO 8GI - 8.32","SKEXKT0676",2,60,20],[131,"CGO 8N - 8.0","SKEXKT0675",2,60,20],[132,"CGO 8NA - 8.01","SKEXKT0668",2,60,20],[133,"CGO 8NN - 8.00","SKEXKT0669",2,60,20],[134,"CGO 8NW - 8.03","SKEXKT0670",2,60,20],[135,"DIA ACTIVATEUR II 15 VOL 1L V034","SKEXKT0592",1,1000,22.89],[136,"DIA ACTIVATEUR II 6 VOL 1L V034","SKEXKT0593",1,1000,22.89],[137,"DIA ACTIVATEUR II 9 VOL 1L V034","SKEXKT0594",1,1000,22.88],[138,"LOREAL INOA 4.0","SKEXKT0474",1,60,20],[139,"LOREAL INOA 5.0","SKEXKT0595",5,60,21.06],[140,"LOREAL INOA 5.3","SKEXKT0475",6,60,20],[141,"LOREAL INOA 5.32","SKEXKT0476",2,60,20],[142,"LOREAL INOA 5.35","SKEXKT0477",2,60,20],[143,"LOREAL INOA 5.4","SKEXKT0478",1,60,20],[144,"LOREAL INOA 5.60","SKEXKT0479",2,60,20],[145,"LOREAL INOA 6.0","SKEXKT0480",4,60,20],[146,"LOREAL INOA 6.23","SKEXKT0481",2,60,20],[147,"LOREAL INOA 6.3","SKEXKT0482",6,60,20],[148,"LOREAL INOA 6.32","SKEXKT0483",2,60,20],[149,"LOREAL INOA 6.34","SKEXKT0484",1,60,20],[150,"LOREAL INOA 6.45","SKEXKT0485",2,60,20],[151,"LOREAL INOA 6.46","SKEXKT0486",2,60,20],[152,"LOREAL INOA 6.66","SKEXKT0487",2,60,20],[153,"LOREAL INOA 7.0","SKEXKT0488",5,60,20],[154,"LOREAL INOA 7.1","SKEXKT0489",5,60,20],[155,"LOREAL INOA 7.13","SKEXKT0490",2,60,20],[156,"LOREAL INOA 7.23","SKEXKT0491",1,60,20],[157,"LOREAL INOA 7.3","SKEXKT0492",5,60,20],[158,"LOREAL INOA 7.31","SKEXKT0493",2,60,20],[159,"LOREAL INOA 7.43","SKEXKT0494",2,60,20],[160,"LOREAL INOA 7.8","SKEXKT0495",5,60,20],[161,"LOREAL INOA 8.23","SKEXKT0496",2,60,20],[162,"LOREAL INOA 9.13","SKEXKT0497",2,60,20],[163,"LP BLOND STUDIO MT8 500G VD56","SKEXKT0698",2,null,20],[164,"LP DIA LIGHT 10.02 50ML V511","SKEXKT0596",1,50,15.64],[165,"LP DIA LIGHT 10.12 50ML V511","SKEXKT0597",1,50,15.64],[166,"LP DIA LIGHT 10.13 50ML V511","SKEXKT0598",1,50,15.64],[167,"LP DIA LIGHT 10.21 50ML V511","SKEXKT0599",1,50,15.64],[168,"LP DIA LIGHT 5 50ML V511","SKEXKT0600",1,50,15.64],[169,"LP DIA LIGHT 6 50ML V511","SKEXKT0601",1,50,15.64],[170,"LP DIA LIGHT 7 50ML V511","SKEXKT0602",1,50,15.64],[171,"LP DIA LIGHT 7.01 50ML V511","SKEXKT0603",1,50,15.64],[172,"LP DIA LIGHT 8.11 50ML V511","SKEXKT0604",1,50,15.64],[173,"LP DIA LIGHT 8.18 50ML V511","SKEXKT0605",1,50,15.64],[174,"LP DIA LIGHT 8.3 50ML V511","SKEXKT0606",1,50,15.64],[175,"LP DIA LIGHT 9.01 50ML V511","SKEXKT0607",1,50,15.64],[176,"LP DIA LIGHT 9.02 50ML V511","SKEXKT0608",1,50,15.64],[177,"LP DIA LIGHT 9.03 50ML V511","SKEXKT0609",1,50,15.64],[178,"LP DIA LIGHT 9.1 50ML V511","SKEXKT0610",1,50,15.64],[179,"LP DIA LIGHT 9.12 50ML V511","SKEXKT0611",1,50,15.64],[180,"LP DIA LIGHT 9.13 50ML V511","SKEXKT0612",1,50,15.64],[181,"LP DIA LIGHT 9.18 50ML V511","SKEXKT0613",1,50,15.64],[182,"LP DIA LIGHT 9.3 50ML V511","SKEXKT0614",1,50,15.64],[183,"LP SE ARM Leave-in 100ml V034","SKEXKT0615",2,100,86.15],[184,"LP SE ARM Liq Treat 250mL V034","SKEXKT0678",1,250,20],[185,"LP SE ARM Pre-Shp 190ml V034","SKEXKT0616",1,190,98.87],[186,"LP SE ARM Rinse off mask 250ml V034","SKEXKT0684",1,250,20],[187,"LP SE ARM Rinse off mask 500ml V034","SKEXKT0617",2,500,159.01],[188,"LP SE ARM Shp 1500ml T V034","SKEXKT0618",1,1500,228.39],[189,"LP SE ARM Shp 300ml R V034","SKEXKT0679",1,300,20],[190,"LP SE Curls Activ Jell 250ml R VA16","SKEXKT0654",1,250,20],[191,"LP SE Curls Moist Shp 500ml R VB98","SKEXKT0658",1,500,20],[192,"LP SE Curls Msq 250ml R VI21","SKEXKT0657",2,250,20],[193,"LP SE Curls Msq 500ml T VI16","SKEXKT0655",1,500,20],[194,"LP SE MRVL OIL 50mL R VJ20","SKEXKT0660",1,50,20],[195,"LP SE Metal D TREAT SPR 500 ML I34","SKEXKT0619",1,500,235.33],[196,"LP SE Metal LIQ 500ML J20","SKEXKT0620",1,500,159.01],[197,"LP SE Metal Msq 250 ML J20","SKEXKT0643",1,250,20],[198,"LP SE Metal Msq 500ml J20","SKEXKT0621",2,500,159.01],[199,"LP SE Metal SHP 1500 ML J20","SKEXKT0622",1,1500,228.39],[200,"LP SE Metal SHP 300 ML J20","SKEXKT0642",1,300,20],[201,"LP SE Scalp A-Oily Msq 250ml R I21","SKEXKT0659",1,250,20],[202,"LP SE Scalp A-Oily Shp 300ml R VB98","SKEXKT0662",1,300,20],[203,"LP SE Spectrum GlassShine 50mL V034","SKEXKT0693",2,50,20],[204,"LP SE VitSpectrum Condi 200ml V034","SKEXKT0697",3,200,20],[205,"LP SE VitSpectrum Condi 750ml V034","SKEXKT0696",1,750,20],[206,"LP SE VitSpectrum Msq 250ml V034","SKEXKT0694",2,250,20],[207,"LP SE VitSpectrum Msq 500ml V034","SKEXKT0692",1,500,20],[208,"LP SE VitSpectrum Shp 1500ml V034","SKEXKT0695",1,1500,20],[209,"LP SE21 Abs Rep Msq G250ml R VI21","SKEXKT0651",1,250,20],[210,"LP SE21 Abs Rep Msq G500 T VI16","SKEXKT0650",1,null,20],[211,"LP SE21 Abs Rep Shp 300ml R VB98","SKEXKT0647",1,300,20],[212,"LP SE21 Abs Rep Shp 500ml R VB98","SKEXKT0652",1,500,20],[213,"LP SE21 Liss Msq 250ml R VI21","SKEXKT0653",1,250,20],[214,"LP SE21 Liss Ser 125ml R VA16","SKEXKT0648",1,125,20],[215,"LP SE21 Liss Shp 300ml R VB98","SKEXKT0649",1,300,20],[216,"LP iNOA 10VOL OXYDANT 1L V034","SKEXKT0623",2,1000,32.26],[217,"LP iNOA 2.10 60G VJ15","SKEXKT0624",2,60,21.06],[218,"LP iNOA 20VOL OXYDANT 1L V034","SKEXKT0625",3,1000,32.26],[219,"LP iNOA 30VOL OXYDANT 1L V034","SKEXKT0626",1,1000,32.26],[220,"LP iNOA 5.1 60G VJ15","SKEXKT0627",2,60,21.06],[221,"LP iNOA 5.18 60G VJ15","SKEXKT0628",3,60,21.06],[222,"LP iNOA 8 60G VJ15","SKEXKT0673",2,60,20],[223,"LP iNOA 8.1 60G VJ15","SKEXKT0629",3,60,21.06],[224,"LP iNOA 8.3 60G VJ15","SKEXKT0671",2,60,20],[225,"LP iNOA 8.34 60G VJ15","SKEXKT0630",2,60,21.06],[226,"LP iNOA 9 60G VJ15","SKEXKT0674",2,60,20],[227,"LP iNOA 9.3 60G VJ15","SKEXKT0672",2,60,20],[228,"Lp SE Curls Moist Shp 300ml R VB98","SKEXKT0656",2,300,20],[229,"RD ACG Cond 300ML V805","SKEXKT0680",2,300,20],[230,"RD ACG SHP 300ML V805","SKEXKT0681",2,300,20],[231,"RK ABC COND 300ML 21 V805","SKEXKT0708",1,300,20],[232,"RK ABC CURLS COND 300ML V805","SKEXKT0683",1,300,20],[233,"RK ABC CURLS SHMP 300ML V805","SKEXKT0682",1,300,20],[234,"RK ABC SHMP 300ML 21 V805","SKEXKT0707",1,300,20],[235,"RK ASOFT COND 500ML RN21 V805","SKEXKT0704",1,500,20],[236,"RK CEXT MAG COND 300ML RN21 V382","SKEXKT0705",3,300,20],[237,"RK CEXT MAG SF SHMP 300ML RN21 V382","SKEXKT0706",3,300,20],[238,"RK FRIZZ SF SHMP 300ML RN21 V382","SKEXKT0645",1,300,20],[239,"RK FRZ MSK 250ML RN21 V805","SKEXKT0646",1,250,20],[240,"RK ONE UNITED ELIXIR 150ML V315","SKEXKT0661",1,150,20],[241,"SEQ 010VV","SKEXKT0631",4,60,23.09],[242,"SEQ 03N","SKEXKT0632",2,60,23.09],[243,"SEQ 03NB","SKEXKT0685",1,60,20],[244,"SEQ 04NA","SKEXKT0633",1,60,23.09],[245,"SEQ 05G","SKEXKT0634",3,60,23.09],[246,"SEQ 05N","SKEXKT0635",3,60,23.09],[247,"SEQ 06ABn","SKEXKT0644",1,60,20],[248,"SEQ 06G","SKEXKT0686",1,60,20],[249,"SEQ 06GB","SKEXKT0687",1,60,20],[250,"SEQ 06N","SKEXKT0701",1,60,20],[251,"SEQ 06NA","SKEXKT0636",4,60,23.09],[252,"SEQ 06NB","SKEXKT0688",1,60,20],[253,"SEQ 06WG","SKEXKT0637",3,60,23.09],[254,"SEQ 07C","SKEXKT0638",2,60,23.09],[255,"SEQ 07G","SKEXKT0689",1,60,20],[256,"SEQ 07GB","SKEXKT0639",3,60,23.09],[257,"SEQ 07N","SKEXKT0640",2,60,23.09],[258,"SEQ 07NA","SKEXKT0641",3,60,23.09],[259,"SEQ 07NB","SKEXKT0691",1,60,20],[260,"SEQ 08GG","SKEXKT0690",2,60,20],[261,"SEQ 08WG","SKEXKT0700",2,60,20],[262,"SEQ 09G","SKEXKT0702",2,60,20],[263,"SEQ 09NA","SKEXKT0703",2,60,20],[264,"SEQ PROCESSING SOLUTION","SKEXKT0699",4,60,20],[265,"Shampoo Resur Rection1","SKEXKT0498",1,null,0],[266,"TINTE KUUL COLOR 000","SKEXKT0499",5,90,20],[267,"TINTE KUUL COLOR 1","SKEXKT0500",6,90,20],[268,"TINTE KUUL COLOR 10","SKEXKT0501",1,90,20],[269,"TINTE KUUL COLOR 10.1","SKEXKT0502",2,90,20],[270,"TINTE KUUL COLOR 10.11","SKEXKT0503",3,90,20],[271,"TINTE KUUL COLOR 10.22","SKEXKT0504",4,90,20],[272,"TINTE KUUL COLOR 10.31","SKEXKT0505",4,90,20],[273,"TINTE KUUL COLOR 1A","SKEXKT0506",6,90,20],[274,"TINTE KUUL COLOR 1V","SKEXKT0507",6,90,20],[275,"TINTE KUUL COLOR 2","SKEXKT0508",6,90,20],[276,"TINTE KUUL COLOR 3","SKEXKT0509",6,90,20],[277,"TINTE KUUL COLOR 4","SKEXKT0510",1,90,20],[278,"TINTE KUUL COLOR 4.65","SKEXKT0511",5,90,0],[279,"TINTE KUUL COLOR 5","SKEXKT0512",1,90,20],[280,"TINTE KUUL COLOR 5.1","SKEXKT0513",3,90,20],[281,"TINTE KUUL COLOR 5.31","SKEXKT0515",2,90,20],[282,"TINTE KUUL COLOR 5.31","SKEXKT0514",1,90,20],[283,"TINTE KUUL COLOR 6.1","SKEXKT0516",4,90,20],[284,"TINTE KUUL COLOR 6.12","SKEXKT0517",4,90,20],[285,"TINTE KUUL COLOR 6.34","SKEXKT0518",3,90,20],[286,"TINTE KUUL COLOR 6.66","SKEXKT0519",5,90,20],[287,"TINTE KUUL COLOR 7","SKEXKT0520",1,90,20],[288,"TINTE KUUL COLOR 7.1","SKEXKT0521",0,90,20],[289,"TINTE KUUL COLOR 7.11","SKEXKT0522",1,90,20],[290,"TINTE KUUL COLOR 7.12","SKEXKT0523",2,90,20],[291,"TINTE KUUL COLOR 7.35","SKEXKT0524",2,90,20],[292,"TINTE KUUL COLOR 7.44","SKEXKT0525",0,90,20],[293,"TINTE KUUL COLOR 7.62","SKEXKT0526",4,90,20],[294,"TINTE KUUL COLOR 7.64","SKEXKT0528",3,90,20],[295,"TINTE KUUL COLOR 7.64","SKEXKT0527",5,90,20],[296,"TINTE KUUL COLOR 7.66","SKEXKT0530",4,90,20],[297,"TINTE KUUL COLOR 7.66","SKEXKT0529",6,90,20],[298,"TINTE KUUL COLOR 8","SKEXKT0531",4,90,20],[299,"TINTE KUUL COLOR 8.1","SKEXKT0532",5,90,20],[300,"TINTE KUUL COLOR 8.22","SKEXKT0533",3,90,20],[301,"TINTE KUUL COLOR 8.62","SKEXKT0534",6,90,20],[302,"TINTE KUUL COLOR 8.66","SKEXKT0535",6,90,20],[303,"TINTE KUUL COLOR 9","SKEXKT0536",5,90,20],[304,"TINTE KUUL COLOR 9.1","SKEXKT0537",5,90,20],[305,"TINTE KUUL COLOR 9.11","SKEXKT0538",4,90,20],[306,"TINTE KUUL COLOR 9.12","SKEXKT0539",1,90,20],[307,"TINTE KUUL COLOR 9.66","SKEXKT0540",6,90,20],[308,"TINTE KUUL COLOR 9.9","SKEXKT0541",3,90,20],[309,"TINTE KUUL COLOR 902","SKEXKT0542",1,90,20],[310,"TINTE KUUL COLOR AMARILLO NEON","SKEXKT0543",6,90,20],[311,"TINTE KUUL COLOR AZUL","SKEXKT0544",5,90,20],[312,"TINTE KUUL COLOR AZUL CELESTE","SKEXKT0545",6,90,20],[313,"TINTE KUUL COLOR AZUL JEANS","SKEXKT0546",6,90,20],[314,"TINTE KUUL COLOR AZUL METALICO","SKEXKT0547",6,90,20],[315,"TINTE KUUL COLOR AZUL NEON","SKEXKT0548",5,90,20],[316,"TINTE KUUL COLOR AZUL OCEANO 90 ML","SKEXKT0549",5,90,20],[317,"TINTE KUUL COLOR BLANCO TITANIO","SKEXKT0550",5,90,20],[318,"TINTE KUUL COLOR BUGAMBILIA","SKEXKT0551",6,90,0],[319,"TINTE KUUL COLOR CORAL","SKEXKT0552",6,90,20],[320,"TINTE KUUL COLOR MAGENTA","SKEXKT0553",2,90,20],[321,"TINTE KUUL COLOR NARANJA","SKEXKT0554",6,90,20],[322,"TINTE KUUL COLOR PLATA 90ML","SKEXKT0555",1,90,20],[323,"TINTE KUUL COLOR PLATINADO METALICO","SKEXKT0556",6,90,20],[324,"TINTE KUUL COLOR REFLECTS COBRE","SKEXKT0557",3,90,20],[325,"TINTE KUUL COLOR REFLECTS DORADO COBRIZO","SKEXKT0558",4,90,20],[326,"TINTE KUUL COLOR REFLECTS RED","SKEXKT0559",3,90,20],[327,"TINTE KUUL COLOR REFLECTS VIOLETA","SKEXKT0560",4,90,20],[328,"TINTE KUUL COLOR REFLECTS VIOLETA ROJO","SKEXKT0561",1,90,20],[329,"TINTE KUUL COLOR ROJO","SKEXKT0562",6,90,20],[330,"TINTE KUUL COLOR ROJO ROSADO","SKEXKT0563",6,90,20],[331,"TINTE KUUL COLOR ROJO VIOLETA","SKEXKT0564",6,90,20],[332,"TINTE KUUL COLOR ROSA","SKEXKT0565",6,90,20],[333,"TINTE KUUL COLOR ROSA METALICO","SKEXKT0566",6,90,20],[334,"TINTE KUUL COLOR ROSA NEON","SKEXKT0567",6,90,20],[335,"TINTE KUUL COLOR VERDE NEON","SKEXKT0568",6,90,20],[336,"TINTE KUUL COLOR VERDE PERA","SKEXKT0569",6,90,20],[337,"TINTE KUUL COLOR VIOLETA","SKEXKT0570",6,90,20],[338,"TINTE KUUL COLOR VIOLETA NEON","SKEXKT0571",5,90,20],[339,"TINTE KUUL COLOR cromo corrector","SKEXKT0572",6,90,20],[340,"TINTE KUUL COLOR plata 60 ml","SKEXKT0573",6,60,20],[341,"TINTE KUUL COLOR verde","SKEXKT0574",6,90,20],[342,"TINTE KUUL COLOR verde esmeralda 60 ml","SKEXKT0575",4,60,20],[343,"TINTE KUUL COLOR verde esmeralda 90 ml","SKEXKT0576",1,90,20],[344,"TNTE KUUL COLOR 8.11","SKEXKT0577",4,90,0],[345,"Tigi Treat me Right","SKEXKT0578",2,null,0],[346,"Tigi after party","SKEXKT0579",4,null,0],[347,"Tigi bed hea","SKEXKT0580",2,null,0],[348,"Tigi curis rock","SKEXKT0581",2,null,0],[349,"Tigi curls rock amplifier","SKEXKT0582",2,null,0],[350,"Tigi small talk","SKEXKT0583",2,null,0],[351,"in","SKEXKT0584",1,null,0]];
    
    return RAW_DATA.map(p => {
      const totalML = p[4] && p[3] ? p[4] * p[3] : 0;
      return {
        id: p[0],
        name: p[1],
        sku: p[2],
        units: p[3],
        capacityML: p[4],
        totalML: totalML,
        consumedML: 0,
        availableML: totalML,
        price: p[5]
      };
    });
  };

  useEffect(() => {
    if (searchTerm) {
      setFilteredProducts(
        products.filter(p => 
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.sku.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [searchTerm, products]);

  const handleRegisterConsumption = () => {
    if (!selectedProduct || !consumptionML || consumptionML <= 0) {
      alert('⚠️ Por favor completa todos los campos');
      return;
    }

    if (!selectedProduct.capacityML) {
      alert('⚠️ Este producto no tiene ML definido');
      return;
    }

    const mlUsed = parseFloat(consumptionML);
    
    if (mlUsed > selectedProduct.availableML) {
      alert(`⚠️ Stock insuficiente. Solo hay ${selectedProduct.availableML.toFixed(0)}ml disponibles`);
      return;
    }

    const updatedProducts = products.map(p => {
      if (p.id === selectedProduct.id) {
        return {
          ...p,
          consumedML: p.consumedML + mlUsed,
          availableML: p.totalML - (p.consumedML + mlUsed)
        };
      }
      return p;
    });

    const newConsumption = {
      id: Date.now(),
      productName: selectedProduct.name,
      sku: selectedProduct.sku,
      mlUsed,
      stylist: stylistName || 'No especificado',
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleString('es-PE')
    };

    setProducts(updatedProducts);
    setConsumptionHistory([newConsumption, ...consumptionHistory]);
    setConsumptionML('');
    setStylistName('');
    setSelectedProduct(null);
    
    alert(`✅ Consumo registrado:\n${selectedProduct.name}\n-${mlUsed}ml\nEstilista: ${newConsumption.stylist}`);
  };

  const getLowStockProducts = () => {
    return products.filter(p => {
      if (!p.capacityML || p.totalML === 0) return false;
      const percentage = (p.availableML / p.totalML) * 100;
      return percentage < 30 && percentage > 0;
    });
  };

  const getStats = () => {
    const withML = products.filter(p => p.capacityML !== null);
    const totalMLAvailable = products.reduce((sum, p) => sum + (p.availableML || 0), 0);
    const totalMLConsumed = products.reduce((sum, p) => sum + (p.consumedML || 0), 0);
    
    return {
      total: products.length,
      withML: withML.length,
      withoutML: products.length - withML.length,
      totalMLAvailable: Math.round(totalMLAvailable),
      totalMLConsumed: Math.round(totalMLConsumed),
      lowStock: getLowStockProducts().length
    };
  };

  const getStylistStats = () => {
    const map = {};
    consumptionHistory.forEach(r => {
      if (!map[r.stylist]) map[r.stylist] = { count: 0, totalML: 0 };
      map[r.stylist].count++;
      map[r.stylist].totalML += r.mlUsed;
    });
    return Object.entries(map).map(([name, stats]) => ({
      name, ...stats
    })).sort((a, b) => b.totalML - a.totalML);
  };

  const getFilteredHistory = () => {
    if (!startDate && !endDate) return consumptionHistory;
    
    return consumptionHistory.filter(record => {
      const recordDate = new Date(record.timestamp);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate + 'T23:59:59') : null;
      
      if (start && end) {
        return recordDate >= start && recordDate <= end;
      } else if (start) {
        return recordDate >= start;
      } else if (end) {
        return recordDate <= end;
      }
      return true;
    });
  };

  const exportToExcel = () => {
    const filteredData = getFilteredHistory();
    
    if (filteredData.length === 0) {
      alert('⚠️ No hay datos para exportar en el periodo seleccionado');
      return;
    }

    // Crear CSV
    const headers = ['Fecha', 'Producto', 'SKU', 'ML Consumidos', 'Estilista'];
    const rows = filteredData.map(r => [
      r.date,
      r.productName,
      r.sku,
      r.mlUsed,
      r.stylist
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    // Descargar archivo
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    
    const fileName = startDate && endDate 
      ? `consumo_${startDate}_${endDate}.csv`
      : `consumo_${new Date().toISOString().split('T')[0]}.csv`;
    
    link.setAttribute('download', fileName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    alert(`✅ Reporte descargado: ${filteredData.length} registros`);
  };

  const exportBackup = () => {
    const backupData = {
      version: '1.0',
      date: new Date().toISOString(),
      consumptionHistory: consumptionHistory,
      productsConsumption: products.map(p => ({
        id: p.id,
        sku: p.sku,
        name: p.name,
        consumedML: p.consumedML
      }))
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `backup_inventario_${new Date().toISOString().split('T')[0]}.json`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    alert('✅ Backup completo descargado. Guarda este archivo en lugar seguro.');
  };

  const clearAllData = () => {
    if (confirm('⚠️ ¿SEGURO que quieres borrar TODO el historial y empezar de cero?\n\nEsta acción NO se puede deshacer.\n\nRecomendación: Descarga un backup antes de continuar.')) {
      if (confirm('⚠️ ÚLTIMA CONFIRMACIÓN: ¿Borrar todos los datos?')) {
        localStorage.removeItem('consumptionHistory');
        localStorage.removeItem('productsConsumption');
        window.location.reload();
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-semibold">Cargando inventario...</p>
        </div>
      </div>
    );
  }

  const stats = getStats();
  const stylistStats = getStylistStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Nota informativa */}
        {products.length === 351 && (
          <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-6 rounded-lg">
            <div className="flex items-start">
              <Package className="text-green-500 mr-3 flex-shrink-0" size={24} />
              <div>
                <p className="font-bold text-green-900">✅ Sistema Completo Activo</p>
                <p className="text-green-800 text-sm">
                  351 productos cargados. Todos los consumos se guardan automáticamente. 
                  <strong> Haz backup regularmente</strong> con el botón azul de arriba.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-purple-900">💈 Control de Inventario</h1>
              <p className="text-gray-600">Sistema de seguimiento de consumo en ML</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={exportBackup}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl flex items-center shadow-lg transition-all"
                title="Descargar backup completo"
              >
                <Download size={20} className="mr-2" />
                Backup
              </button>
              <button
                onClick={clearAllData}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl flex items-center shadow-lg transition-all"
                title="Borrar todos los datos"
              >
                <AlertTriangle size={20} className="mr-2" />
                Reset
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border-2 border-purple-200">
              <p className="text-xs text-purple-700 font-semibold">Total</p>
              <p className="text-3xl font-bold text-purple-900">{stats.total}</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border-2 border-green-200">
              <p className="text-xs text-green-700 font-semibold">Con ML</p>
              <p className="text-3xl font-bold text-green-900">{stats.withML}</p>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl border-2 border-gray-200">
              <p className="text-xs text-gray-700 font-semibold">Sin ML</p>
              <p className="text-3xl font-bold text-gray-900">{stats.withoutML}</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border-2 border-blue-200">
              <p className="text-xs text-blue-700 font-semibold">ML Disponibles</p>
              <p className="text-2xl font-bold text-blue-900">{stats.totalMLAvailable.toLocaleString()}</p>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-xl border-2 border-red-200">
              <p className="text-xs text-red-700 font-semibold">ML Consumidos</p>
              <p className="text-2xl font-bold text-red-900">{stats.totalMLConsumed.toLocaleString()}</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-xl border-2 border-yellow-200">
              <p className="text-xs text-yellow-700 font-semibold">Stock Bajo</p>
              <p className="text-3xl font-bold text-yellow-900">{stats.lowStock}</p>
            </div>
          </div>
          
          {consumptionHistory.length > 0 && (
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">
                💾 Datos guardados automáticamente | {consumptionHistory.length} consumos registrados
              </p>
            </div>
          )}
        </div>

        {/* Alertas */}
        {stats.lowStock > 0 && (
          <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-5 mb-6 rounded-2xl shadow-lg">
            <div className="flex items-center">
              <AlertTriangle size={32} className="mr-4" />
              <div>
                <p className="font-bold text-xl">⚠️ Alerta de Stock Crítico</p>
                <p>{stats.lowStock} producto(s) con menos del 30% disponible</p>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-xl mb-6">
          <div className="flex border-b-2">
            {[
              { id: 'inventory', icon: Package, label: 'Inventario' },
              { id: 'register', icon: Minus, label: 'Registrar' },
              { id: 'history', icon: TrendingDown, label: 'Historial' },
              { id: 'analytics', icon: BarChart3, label: 'Analíticas' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-4 px-6 font-bold transition-all ${
                  activeTab === tab.id
                    ? 'border-b-4 border-purple-600 text-purple-600 bg-purple-50'
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="inline mr-2" size={22} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Contenido */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          {activeTab === 'inventory' && (
            <div>
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-4 top-4 text-gray-400" size={22} />
                  <input
                    type="text"
                    placeholder="🔍 Buscar por nombre o SKU..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none"
                  />
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  📦 Mostrando {filteredProducts.length} de {products.length} productos
                </p>
              </div>

              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {filteredProducts.map(product => {
                  if (!product.capacityML) {
                    return (
                      <div key={product.id} className="border-2 border-gray-300 rounded-xl p-5 bg-gray-50">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-bold text-lg">{product.name}</h3>
                            <p className="text-sm text-gray-600">SKU: {product.sku}</p>
                          </div>
                          <div className="text-right">
                            <span className="px-4 py-2 bg-gray-200 rounded-lg font-bold">Sin ML</span>
                            <p className="text-sm text-gray-600 mt-1">{product.units} unidades</p>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  const percentage = product.totalML > 0 ? (product.availableML / product.totalML) * 100 : 0;
                  const isLow = percentage < 30 && percentage > 0;
                  const isMedium = percentage >= 30 && percentage < 60;

                  return (
                    <div
                      key={product.id}
                      className={`border-2 rounded-xl p-5 ${
                        isLow ? 'border-red-400 bg-red-50' : 
                        isMedium ? 'border-yellow-400 bg-yellow-50' : 
                        'border-green-400 bg-green-50'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-bold text-xl">{product.name}</h3>
                          <p className="text-sm text-gray-700">📋 SKU: {product.sku}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-3xl font-black text-purple-700">
                            {product.availableML.toFixed(0)}ml
                          </p>
                          <p className="text-sm text-gray-600">de {product.totalML.toFixed(0)}ml</p>
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="w-full bg-gray-300 rounded-full h-4">
                          <div
                            className={`h-4 rounded-full ${
                              isLow ? 'bg-red-500' : isMedium ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-4 gap-3">
                        <div className="bg-white p-3 rounded-lg">
                          <p className="text-xs text-gray-600 font-semibold">Unidades</p>
                          <p className="text-lg font-bold">{product.units}</p>
                        </div>
                        <div className="bg-white p-3 rounded-lg">
                          <p className="text-xs text-gray-600 font-semibold">ML/und</p>
                          <p className="text-lg font-bold text-blue-700">{product.capacityML}ml</p>
                        </div>
                        <div className="bg-white p-3 rounded-lg">
                          <p className="text-xs text-gray-600 font-semibold">Consumido</p>
                          <p className="text-lg font-bold text-red-600">{product.consumedML.toFixed(0)}ml</p>
                        </div>
                        <div className="bg-white p-3 rounded-lg">
                          <p className="text-xs text-gray-600 font-semibold">Disponible</p>
                          <p className="text-lg font-bold text-green-600">{percentage.toFixed(1)}%</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'register' && (
            <div>
              <h2 className="text-3xl font-bold mb-6 flex items-center">
                <Minus className="mr-3 text-purple-600" size={32} />
                Registrar Consumo
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold mb-3">🎨 Producto</label>
                  <select
                    value={selectedProduct?.id || ''}
                    onChange={(e) => setSelectedProduct(products.find(p => p.id === parseInt(e.target.value)))}
                    className="w-full p-4 text-lg border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none"
                  >
                    <option value="">Selecciona un producto...</option>
                    {products.filter(p => p.capacityML).map(p => (
                      <option key={p.id} value={p.id}>
                        {p.name} - {p.availableML.toFixed(0)}ml disponibles
                      </option>
                    ))}
                  </select>
                </div>

                {selectedProduct && (
                  <div className="bg-purple-50 p-6 rounded-2xl border-2 border-purple-200">
                    <h3 className="font-bold text-xl mb-4">{selectedProduct.name}</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-xl">
                        <p className="text-sm text-gray-600 font-semibold">💧 Disponible</p>
                        <p className="text-3xl font-black text-green-600">{selectedProduct.availableML.toFixed(0)}ml</p>
                      </div>
                      <div className="bg-white p-4 rounded-xl">
                        <p className="text-sm text-gray-600 font-semibold">📦 Total</p>
                        <p className="text-3xl font-black text-blue-600">{selectedProduct.totalML.toFixed(0)}ml</p>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-bold mb-3">💧 Cantidad (ML)</label>
                  <input
                    type="number"
                    min="1"
                    value={consumptionML}
                    onChange={(e) => setConsumptionML(e.target.value)}
                    placeholder="Ej: 30"
                    className="w-full p-4 text-2xl font-bold border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-3">👤 Estilista (Opcional)</label>
                  <input
                    type="text"
                    value={stylistName}
                    onChange={(e) => setStylistName(e.target.value)}
                    placeholder="Nombre"
                    className="w-full p-4 text-lg border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none"
                  />
                </div>

                <button
                  onClick={handleRegisterConsumption}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-5 rounded-xl text-lg flex items-center justify-center"
                >
                  <Save className="mr-3" size={24} />
                  Registrar Consumo
                </button>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div>
              <h2 className="text-3xl font-bold mb-6 flex items-center">
                <TrendingDown className="mr-3 text-purple-600" size={32} />
                Historial ({consumptionHistory.length})
              </h2>

              {consumptionHistory.length === 0 ? (
                <div className="text-center py-16">
                  <TrendingDown size={64} className="mx-auto mb-6 opacity-30" />
                  <p className="text-2xl font-bold mb-2">Sin registros</p>
                  <p className="text-lg text-gray-600">Los consumos aparecerán aquí</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {consumptionHistory.map(r => (
                    <div key={r.id} className="border-2 border-purple-200 rounded-xl p-5 bg-purple-50">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-bold text-xl">{r.productName}</h3>
                          <p className="text-sm text-gray-700">📋 {r.sku}</p>
                          <p className="text-sm text-purple-700 font-semibold mt-2">👤 {r.stylist}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-3xl font-black text-red-600">-{r.mlUsed}ml</p>
                          <p className="text-xs text-gray-600 mt-1">🕐 {r.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'analytics' && (
            <div>
              <h2 className="text-3xl font-bold mb-6 flex items-center">
                <BarChart3 className="mr-3 text-purple-600" size={32} />
                Analíticas
              </h2>

              <div className="space-y-6">
                <div className="bg-purple-50 p-6 rounded-2xl border-2 border-purple-200">
                  <h3 className="text-xl font-bold mb-4">📊 Resumen</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white p-4 rounded-xl">
                      <p className="text-sm font-semibold text-gray-600">Consumos</p>
                      <p className="text-3xl font-black text-purple-700">{consumptionHistory.length}</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl">
                      <p className="text-sm font-semibold text-gray-600">ML Consumidos</p>
                      <p className="text-3xl font-black text-red-600">{stats.totalMLConsumed}</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl">
                      <p className="text-sm font-semibold text-gray-600">ML Disponibles</p>
                      <p className="text-3xl font-black text-green-600">{stats.totalMLAvailable}</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl">
                      <p className="text-sm font-semibold text-gray-600">Stock Crítico</p>
                      <p className="text-3xl font-black text-orange-600">{stats.lowStock}</p>
                    </div>
                  </div>
                </div>

                {stylistStats.length > 0 && (
                  <div className="bg-blue-50 p-6 rounded-2xl border-2 border-blue-200">
                    <h3 className="text-xl font-bold mb-4 flex items-center">
                      <Users className="mr-2" size={24} />
                      Ranking Estilistas
                    </h3>
                    <div className="space-y-3">
                      {stylistStats.map((s, idx) => (
                        <div key={s.name} className="bg-white p-4 rounded-xl flex justify-between items-center">
                          <div className="flex items-center flex-1">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white mr-4 ${
                              idx === 0 ? 'bg-yellow-500' : idx === 1 ? 'bg-gray-400' : idx === 2 ? 'bg-orange-600' : 'bg-blue-500'
                            }`}>
                              {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : idx + 1}
                            </div>
                            <div>
                              <p className="font-bold text-lg">{s.name}</p>
                              <p className="text-sm text-gray-600">{s.count} servicios</p>
                            </div>
                          </div>
                          <p className="text-2xl font-black text-purple-700">{s.totalML.toFixed(0)}ml</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}