/* =========================================================================
   PROJECT DATABASE — every project card, gallery and detail page is built from this list.
   To add a project: copy one block, give it a new unique `id`, put images in
   assets/img/projects/<id>/ and videos in assets/video/. See docs/ADD_PROJECT.md.
   Fields marked optional can be removed.
   ========================================================================= */
window.CATEGORIES = {
  thermal:  { en: "Thermal management & e-mobility", vi: "Quản lý nhiệt & xe điện" },
  multiphase:{ en: "Multiphase & free-surface flows", vi: "Dòng đa pha & mặt thoáng" },
  fire:     { en: "Fire safety & ventilation", vi: "An toàn cháy & thông gió" },
  hazard:   { en: "Floods & natural hazards", vi: "Lũ lụt & thiên tai" },
  building: { en: "Buildings & indoor comfort", vi: "Công trình & tiện nghi nhiệt" },
  methods:  { en: "Solvers & numerical methods", vi: "Bộ giải & phương pháp số" }
};

window.PROJECTS = [
  {
    id: "cht-vof-end-winding",
    featured: true,
    category: "thermal",
    status: "under-review",          // published | accepted | under-review | in-progress | demo
    year: 2026,
    title: {
      en: "Oil cooling of electric-motor end windings — a new two-phase CHT solver",
      vi: "Làm mát dầu đầu cuộn dây động cơ điện — bộ giải CHT hai pha mới"
    },
    summary: {
      en: "A custom OpenFOAM solver couples a VOF oil film, dynamic wetting and heat conduction in the copper. Validated on 20 oil-jet experiments: Nusselt number within 3.0 % on average.",
      vi: "Bộ giải OpenFOAM tự phát triển, ghép màng dầu VOF, góc tiếp xúc động và dẫn nhiệt trong đồng. Kiểm chứng trên 20 thí nghiệm tia dầu: sai lệch Nusselt trung bình 3,0 %."
    },
    cover: "assets/img/projects/cht-vof-end-winding/hero.webp",
    video: "assets/video/end-winding-oil-film.mp4",
    poster: "assets/video/end-winding-oil-film.webp",
    solver: "chtMultiRegion two-phase solver (own development, OpenFOAM)",
    physics: ["VOF two-phase", "Conjugate heat transfer", "Kistler dynamic contact angle", "T-dependent viscosity"],
    metrics: [
      { v: "3.0 %", en: "mean deviation of Nu vs. experiments", vi: "sai lệch Nu trung bình so với thực nghiệm" },
      { v: "20", en: "free-surface oil jets validated", vi: "tia dầu được kiểm chứng" },
      { v: "0.1 %", en: "discretisation uncertainty", vi: "sai số rời rạc hoá" }
    ],
    client: { en: "E-motor makers, automotive & aerospace drivetrain teams", vi: "Nhà sản xuất động cơ điện, ô tô, hàng không" },
    sections: [
      {
        h: { en: "The problem", vi: "Bài toán" },
        p: { en: "High power-density electric motors are limited by the temperature of their windings. Direct oil spray onto the end windings removes heat where it is generated, but the oil forms a thin, partly-wetting film whose coverage decides the cooling. Commercial codes either treat the oil as a single phase or ignore heat conduction in the copper, so the predicted hot spots are wrong exactly where they matter.",
             vi: "Động cơ điện mật độ công suất cao bị giới hạn bởi nhiệt độ cuộn dây. Phun dầu trực tiếp lên đầu cuộn dây lấy nhiệt ngay tại nguồn, nhưng dầu tạo màng mỏng ướt một phần — độ phủ quyết định hiệu quả làm mát." },
        img: [{ src: "setup.webp", cap: "Motor geometry: stator, simplified end winding, oil distribution ring and computational domain." }]
      },
      {
        h: { en: "What we built", vi: "Giải pháp" },
        p: { en: "A conjugate heat transfer (CHT) solver for incompressible, immiscible two-phase flows on heated solids. The fluid region uses a volume-of-fluid method with surface tension and the Kistler dynamic contact angle; the solid regions solve an enthalpy conduction equation; both are coupled by a temperature- and flux-continuous interface condition. Heat crosses each wall face in proportion to how much of it is wetted, and the oil viscosity follows its local temperature.",
             vi: "Bộ giải truyền nhiệt liên hợp (CHT) cho dòng hai pha không nén trên vật rắn nóng: VOF + sức căng bề mặt + góc tiếp xúc động Kistler, dẫn nhiệt trong vật rắn, ghép nối liên tục nhiệt độ và thông lượng." },
        img: [{ src: "film.webp", cap: "Oil film and local heat-transfer coefficient on the end winding at t = 0.5, 1.5 and 2.0 s (wetted fraction ξ = 0.31 → 0.58)." },
              { src: "mesh.webp", cap: "Mesh around the winding with refinement in the film region." }]
      },
      {
        h: { en: "How we proved it", vi: "Kiểm chứng" },
        p: { en: "Three independent checks: (1) the exact solution for two semi-infinite bodies brought into contact; (2) twenty laminar free-surface jets of automatic transmission fluid impinging on a heated copper target (228 ≤ Re ≤ 3018, 74 ≤ Pr ≤ 158) — surface-averaged Nusselt number within 3.0 % of experiments and 2.3 % of reference simulations; (3) a water drop spreading on a hot steel plate (We = 0.88) — spreading factor and height oscillation reproduced with mean deviations of 0.08 and 0.06.",
             vi: "Ba bước: lời giải chính xác 1D; 20 tia dầu ATF lên tấm đồng nóng (Nu lệch 3,0 %); giọt nước loang trên tấm thép nóng." },
        img: [{ src: "contact-1d.webp", cap: "Verification against the exact contact-temperature solution." },
              { src: "jet-setup.webp", cap: "Jet-impingement validation set-up and mesh." },
              { src: "nu-re.webp", cap: "Average Nusselt number vs. Reynolds number: present solver, experiments and reference simulations." },
              { src: "drop-thermal.webp", cap: "Water drop on a hot steel plate: plate cools below the moving contact line." }]
      }
    ],
    publication: "Hoang V.Q., A conjugate heat transfer solver for incompressible two-phase flows on heated solids, International Journal of Heat and Mass Transfer (under review, HMT-D-26-07288)."
  },

  {
    id: "xa-huong-flood",
    featured: true,
    category: "hazard",
    status: "submitted",
    year: 2026,
    title: {
      en: "Flood wave in Xa Huong reservoir — landslide & heavy-rain scenario",
      vi: "Sóng lũ hồ Xạ Hương — kịch bản sạt lở & mưa lớn"
    },
    summary: {
      en: "From free satellite terrain to a 3-D two-phase CFD model of a real reservoir in 100 % open-source tools. Predicts wave speed, run-up and the water level at the dam.",
      vi: "Từ dữ liệu địa hình vệ tinh miễn phí đến mô hình CFD 3D hai pha của một hồ chứa thật, hoàn toàn bằng phần mềm mã nguồn mở. Dự báo tốc độ sóng và mực nước tại đập."
    },
    cover: "assets/img/projects/xa-huong-flood/u-t1.webp",
    solver: "interFoam + dynamicRefineFvMesh (OpenFOAM)",
    physics: ["VOF water–air", "k-ω SST turbulence", "Adaptive mesh refinement", "DEM terrain from OpenTopography"],
    metrics: [
      { v: "6.4×10⁷ m³", en: "water mass released by the landslide scenario", vi: "khối nước đổ vào hồ trong kịch bản sạt lở" },
      { v: "+8 m", en: "peak water level above the dam crest", vi: "mực nước đỉnh vượt cao trình đỉnh đập" },
      { v: "0 €", en: "software & data licence cost", vi: "chi phí bản quyền phần mềm & dữ liệu" }
    ],
    client: { en: "Dam owners, provincial disaster agencies, hydropower & insurers", vi: "Chủ đập, cơ quan phòng chống thiên tai, thủy điện, bảo hiểm" },
    sections: [
      {
        h: { en: "The problem", vi: "Bài toán" },
        p: { en: "Heavy rain combined with landslides can pour a huge volume of water and debris into a reservoir within seconds. The resulting wave can overtop the dam and flood downstream villages — far too fast and dangerous to observe directly. Decision makers need to know in advance: how high, how fast, and where.",
             vi: "Mưa lớn kết hợp sạt lở có thể đổ lượng nước khổng lồ vào hồ chỉ trong vài giây, tạo sóng tràn đập và gây ngập hạ lưu." },
        img: [{ src: "satellite.webp", cap: "Xa Huong reservoir and dam (satellite view)." }]
      },
      {
        h: { en: "Terrain-to-CFD workflow", vi: "Quy trình địa hình → CFD" },
        p: { en: "Copernicus 30 m elevation data are downloaded from OpenTopography, interpolated and smoothed in QGIS, converted into a triangulated 3-D surface and meshed with blockMesh + snappyHexMesh. The free surface is followed by dynamic adaptive mesh refinement so that cells are only fine where the wave actually is.",
             vi: "Dữ liệu cao độ Copernicus 30 m → nội suy trong QGIS → bề mặt 3D → chia lưới snappyHexMesh, lưới thích nghi động theo mặt thoáng." },
        img: [{ src: "terrain-pipeline.webp", cap: "(a) map, (b) raw DEM, (c) interpolated DEM, (d) 3-D terrain used as the CFD geometry." },
              { src: "terrain-3d.webp", cap: "Computational terrain, 3.6 km × 2.9 km." }]
      },
      {
        h: { en: "Results", vi: "Kết quả" },
        p: { en: "The wave front reaches the dam in under two minutes; local velocities exceed 15 m/s at impact and the water level at the dam rises above the crest before oscillating back. The workflow is reusable for any reservoir in the world for which public elevation data exist.",
             vi: "Sóng tới đập trong chưa đầy 2 phút, vận tốc cục bộ >15 m/s, mực nước tại đập vượt cao trình đỉnh đập. Quy trình áp dụng được cho bất kỳ hồ chứa nào." },
        img: [{ src: "u-t1.webp", cap: "Velocity magnitude on the water surface — impact phase." },
              { src: "u-t2.webp", cap: "Wave travelling towards the dam." },
              { src: "u-t3.webp", cap: "Run-up along the reservoir arms." },
              { src: "monitoring.webp", cap: "Velocity at monitoring points and water level at the dam vs. dam crest." }]
      }
    ],
    publication: "Do Q.D., Hoang V.Q., Open-Source Terrain-to-CFD Workflow for Flood Risk Assessment: A Case Study of Xa Huong Reservoir (ICTA 2026, submitted)."
  },

  {
    id: "garage-smoke",
    featured: true,
    category: "fire",
    status: "accepted",
    year: 2026,
    title: {
      en: "Smoke & heat control in an underground car park with jet fans",
      vi: "Kiểm soát khói & nhiệt trong hầm gửi xe ngầm có quạt phản lực"
    },
    summary: {
      en: "Full-scale 3-D fire scenario with three burning motorcycles, columns, cars, jet fans and exhaust ducts. Shows whether escape routes stay below tenability limits.",
      vi: "Mô phỏng cháy 3 xe máy trong hầm thật với cột, ô tô, quạt phản lực và ống hút khói. Đánh giá lối thoát nạn có an toàn hay không."
    },
    cover: "assets/img/projects/garage-smoke/velocity.webp",
    solver: "buoyantPimpleFoam (OpenFOAM)",
    physics: ["Buoyancy-driven flow", "k-ω SST", "Passive-scalar smoke", "Volumetric fire source"],
    metrics: [
      { v: "593 050", en: "cells (snappyHexMesh)", vi: "ô lưới" },
      { v: "270 s", en: "fire scenario simulated", vi: "thời gian kịch bản cháy" },
      { v: "≈20 m³/s", en: "jet-fan flow rate, 338–350 Pa", vi: "lưu lượng quạt, 338–350 Pa" }
    ],
    client: { en: "Fire engineers, building developers, MEP consultants, authorities", vi: "Kỹ sư PCCC, chủ đầu tư, tư vấn cơ điện, cơ quan thẩm duyệt" },
    sections: [
      {
        h: { en: "The problem", vi: "Bài toán" },
        p: { en: "Underground car parks shared by cars and motorbikes — and increasingly by EVs with lithium batteries — can fill with smoke in minutes. Real fire tests in a finished building are impossible. Simulation tells you, before construction or retrofit, whether the jet-fan ventilation really pushes smoke towards the exhaust and keeps people safe.",
             vi: "Hầm xe dùng chung ô tô – xe máy – xe điện có thể đầy khói trong vài phút. Không thể đốt thử trong công trình thật." },
        img: [{ src: "model.webp", cap: "Real car-park geometry: columns, cars, motorcycles, jet fans, vent ducts and monitoring points P1–P3." },
              { src: "mesh.webp", cap: "Hex-dominant mesh, 593 050 cells." }]
      },
      {
        h: { en: "Validation", vi: "Kiểm chứng" },
        p: { en: "The buoyant solver set-up was first validated against the classic Ampofo & Karayiannis hot-wall cavity experiment (velocity and smoke-concentration profiles) before being applied to the car park.",
             vi: "Thiết lập bộ giải được kiểm chứng với thí nghiệm hốc tường nóng Ampofo & Karayiannis." },
        img: [{ src: "validation.webp", cap: "Validation: vertical velocity and concentration profiles vs. experiment." }]
      },
      {
        h: { en: "Results", vi: "Kết quả" },
        p: { en: "Time-resolved smoke, temperature and velocity fields show the smoke layer being driven towards the exhaust ducts. A tenability assessment based on temperature and smoke exposure confirms safe conditions at the monitoring points for the considered scenario — and the same model can now test alternative fan positions in hours, not weeks.",
             vi: "Trường khói, nhiệt, vận tốc theo thời gian; đánh giá điều kiện an toàn cho người tại các điểm đo." },
        img: [{ src: "smoke-60.webp", cap: "Smoke at t = 60 s." }, { src: "smoke-120.webp", cap: "Smoke at t = 120 s." },
              { src: "smoke-180.webp", cap: "Smoke at t = 180 s." }, { src: "smoke-270.webp", cap: "Smoke at t = 270 s." },
              { src: "temperature.webp", cap: "Temperature at t = 120 s." }, { src: "velocity.webp", cap: "Velocity magnitude at t = 120 s — jet-fan streams." }]
      }
    ],
    publication: "Hoang V.Q., Do Q.D., CFD Simulation of Smoke Dispersion in Underground Parking Garages, Applications of Modelling and Simulation (accepted, AMS-1486)."
  },

  {
    id: "landslide-dam-breach",
    category: "hazard",
    status: "in-progress",
    year: 2026,
    title: { en: "Landslide into a reservoir — wave, overtopping and dam breach (3-phase VOF)", vi: "Sạt lở vào hồ chứa — sóng, tràn đỉnh và vỡ đập (VOF 3 pha)" },
    summary: {
      en: "Follow-up of the Xa Huong study: a hillside soil mass slides into the lake, the wave overtops the dam, the dam breaches, and the flood is tracked downstream. Water, soil and air are solved together.",
      vi: "Tiếp nối nghiên cứu Xạ Hương: khối đất sườn đồi trượt xuống hồ, sóng tràn qua đập, đập vỡ, lũ lan xuống hạ lưu. Nước, đất và không khí được giải cùng lúc."
    },
    cover: "assets/video/landslide-overtopping.webp",
    video: "assets/video/landslide-overtopping.mp4",
    poster: "assets/video/landslide-overtopping.webp",
    gallery_videos: [{ src: "assets/video/landslide-gate.mp4", poster: "assets/video/landslide-gate.webp", cap: "Lab-scale test: landslide wave combined with a gate dam-break." }],
    solver: "multiphaseInterFoam (OpenFOAM v2606) + own AMR library",
    physics: ["3-phase VOF (water / soil / air)", "Bingham soil rheology", "Prescribed breach", "Adaptive mesh refinement"],
    metrics: [
      { v: "3.1×10⁶ m³", en: "landslide volume in the Xa Huong scenario", vi: "thể tích khối sạt trong kịch bản Xạ Hương" },
      { v: "0.1 %", en: "soil volume change in the lab-scale test", vi: "sai lệch thể tích đất trong bài thử quy mô thí nghiệm" }
    ],
    client: { en: "Dam owners, hydropower operators, disaster-risk planners", vi: "Chủ đập, đơn vị vận hành thủy điện, quy hoạch phòng chống thiên tai" },
    sections: [
      {
        h: { en: "What is new", vi: "Điểm mới" },
        p: { en: "The Xa Huong paper released a block of water into the lake. Here the wave source is a real soil mass on the hillside, modelled as a Bingham fluid, and the dam body and its breach are part of the geometry. The domain is extended downstream so that flood depth, peak velocity and arrival time can be mapped for the villages below the dam.",
             vi: "Bài báo Xạ Hương thả một khối nước vào hồ. Ở đây nguồn sóng là khối đất thật trên sườn đồi (chất lưu Bingham), thân đập và vết vỡ nằm trong hình học. Miền tính mở rộng xuống hạ lưu để lập bản đồ độ sâu ngập, vận tốc lớn nhất và thời gian lũ tới các làng dưới đập." }
      },
      {
        h: { en: "Lab-scale tests first", vi: "Thử ở quy mô thí nghiệm trước" },
        p: { en: "Before the full reservoir, a 6 m × 2 m lab-scale case checks the method: 0.105 m³ of soil slides into a 0.5 m deep lake, raises the lake to 0.61 m, and overtops the dam after about 1.7 s. Soil volume is conserved to 0.1 %. A second test combines the landslide wave with a gate dam-break.",
             vi: "Trước khi chạy hồ thật, case 6 m × 2 m kiểm tra phương pháp: 0,105 m³ đất trượt vào hồ sâu 0,5 m, mặt hồ dâng lên 0,61 m, nước tràn qua đập sau khoảng 1,7 s. Thể tích đất bảo toàn trong 0,1 %. Bài thử thứ hai kết hợp sóng sạt lở với vỡ cửa đập." }
      },
      {
        h: { en: "Status", vi: "Tiến độ" },
        p: { en: "The full Xa Huong scenario (3.1 million m³ landslide, breach opening from 96 m to 66 m over 60 s, 400 s of flood) is running. Outputs include breach discharge, maximum flood-depth and velocity maps, and flood arrival time at five downstream stations.",
             vi: "Kịch bản Xạ Hương đầy đủ (khối sạt 3,1 triệu m³, vết vỡ hạ từ 96 m xuống 66 m trong 60 s, 400 s lũ) đang chạy. Đầu ra: lưu lượng qua vết vỡ, bản đồ độ sâu ngập và vận tốc lớn nhất, thời gian lũ tới tại 5 trạm hạ lưu." }
      }
    ]
  },

  {
    id: "motor-oil-jet",
    category: "thermal",
    status: "demo",
    year: 2025,
    title: { en: "Oil-jet cooling of a complete e-motor", vi: "Làm mát động cơ điện bằng tia dầu — toàn máy" },
    summary: {
      en: "Oil is injected from the top of the housing and drips over the end winding; wall temperature shows which zones stay hot. Used to compare nozzle layouts before building a prototype.",
      vi: "Dầu phun từ đỉnh vỏ chảy qua đầu cuộn dây; nhiệt độ thành cho thấy vùng còn nóng. Dùng để so sánh bố trí vòi trước khi làm mẫu thử."
    },
    cover: "assets/video/motor-oil-jet.webp",
    video: "assets/video/motor-oil-jet.mp4",
    poster: "assets/video/motor-oil-jet.webp",
    solver: "OpenFOAM, two-phase + CHT",
    physics: ["Oil injection", "Film flow on rotating parts", "Wall temperature"],
    sections: [
      { h: { en: "Overview", vi: "Tổng quan" },
        p: { en: "Full-machine simulation with stator, rotor, shaft and oil feed. The animation shows the oil (white) spreading from the inlet and the wall temperature field (colour). This kind of study answers practical design questions: how many nozzles, where, and at which flow rate.",
             vi: "Mô phỏng toàn máy: stato, rôto, trục, đường dầu. Trả lời: bao nhiêu vòi, đặt ở đâu, lưu lượng bao nhiêu." } }
    ]
  },

  {
    id: "hot-liquid-adaptive",
    category: "multiphase",
    status: "demo",
    year: 2025,
    title: { en: "Hot liquid pouring onto a solid — VOF + CHT with adaptive mesh", vi: "Chất lỏng nóng đổ lên vật rắn — VOF + CHT với lưới thích nghi" },
    summary: {
      en: "A liquid volume drains through a neck and spreads over a plate while exchanging heat. The mesh refines automatically around the interface — accuracy where it matters, speed everywhere else.",
      vi: "Khối chất lỏng chảy qua cổ hẹp và loang trên tấm, trao đổi nhiệt với vật rắn. Lưới tự làm mịn quanh mặt phân cách."
    },
    cover: "assets/video/hot-liquid-a.webp",
    video: "assets/video/hot-liquid-a.mp4",
    poster: "assets/video/hot-liquid-a.webp",
    gallery_videos: [{ src: "assets/video/hot-liquid-b.mp4", poster: "assets/video/hot-liquid-b.webp", cap: "Variant with different thermal conditions." }],
    solver: "chtMultiRegion VOF solver + dynamic mesh refinement",
    physics: ["VOF", "Conjugate heat transfer", "Adaptive mesh refinement"],
    sections: [
      { h: { en: "Overview", vi: "Tổng quan" },
        p: { en: "Benchmark case developed while building the two-phase CHT solver. It exercises the hardest parts at once: topology changes of the interface, wetting of a hot wall, and on-the-fly mesh refinement that keeps cell counts low.",
             vi: "Bài toán chuẩn trong quá trình phát triển bộ giải CHT hai pha: thay đổi hình dạng mặt phân cách, thấm ướt thành nóng, làm mịn lưới tự động." } }
    ]
  },

  {
    id: "office-thermal-comfort",
    category: "building",
    status: "demo",
    year: 2025,
    title: { en: "Indoor airflow & thermal comfort around an occupant", vi: "Dòng khí trong phòng & tiện nghi nhiệt quanh người ngồi" },
    summary: {
      en: "Transient velocity and temperature fields from a ceiling diffuser, a seated person and a laptop. Reveals draughts and warm plumes that a single-number HVAC calculation cannot see.",
      vi: "Trường vận tốc và nhiệt độ theo thời gian từ miệng gió trần, người ngồi và máy tính. Phát hiện gió lùa và luồng nhiệt mà tính toán HVAC thông thường bỏ qua."
    },
    cover: "assets/video/office-comfort.webp",
    video: "assets/video/office-comfort.mp4",
    poster: "assets/video/office-comfort.webp",
    solver: "OpenFOAM, buoyant transient",
    physics: ["Buoyant airflow", "Heat sources (body, equipment)", "Thermal comfort"],
    sections: [
      { h: { en: "Overview", vi: "Tổng quan" },
        p: { en: "Left: air velocity. Right: air temperature. The thermal plume rising from the occupant interacts with the supply jet from the ceiling diffuser. Typical deliverables: draught risk, vertical temperature gradient, PMV/PPD, diffuser placement.",
             vi: "Trái: vận tốc. Phải: nhiệt độ. Sản phẩm điển hình: nguy cơ gió lùa, gradient nhiệt theo chiều cao, PMV/PPD, vị trí miệng gió." } }
    ]
  },

  {
    id: "corrugated-channel-optimisation",
    category: "thermal",
    status: "published",
    year: 2025,
    title: { en: "Automated optimisation of corrugated heat-exchanger channels (DAKOTA + OpenFOAM)", vi: "Tối ưu tự động kênh trao đổi nhiệt dạng sóng (DAKOTA + OpenFOAM)" },
    summary: {
      en: "An automatic loop that changes the channel geometry and pulsating-flow parameters, runs CFD and finds the best heat transfer for the pressure drop — no engineer in the loop.",
      vi: "Vòng lặp tự động thay đổi hình học kênh và tham số dòng xung, chạy CFD và tìm cấu hình truyền nhiệt tốt nhất theo tổn thất áp."
    },
    physics: ["Pulsating flow", "Heat transfer enhancement", "Design optimisation", "LES"],
    sections: [
      { h: { en: "Overview", vi: "Tổng quan" },
        p: { en: "DAKOTA drives parametric geometry generation, meshing, OpenFOAM runs and post-processing. Builds on earlier large-eddy simulations of turbulent heat and mass transfer in V-sharp corrugated channels (IJHMT 2021). Directly applicable to battery cold plates, water jackets and compact heat exchangers.",
             vi: "DAKOTA điều khiển tạo hình học, chia lưới, chạy OpenFOAM và hậu xử lý. Ứng dụng: tấm làm mát pin, áo nước, bộ trao đổi nhiệt nhỏ gọn." } }
    ],
    publication: "Hoang V.Q. et al., An automated framework coupling DAKOTA with OpenFOAM for optimizing heat transfer in corrugated channels under pulsating flow conditions, International Journal of Heat and Fluid Flow (2025)."
  },

  {
    id: "spray-film-lagrange-euler",
    category: "multiphase",
    status: "published",
    year: 2023,
    title: { en: "Hybrid Lagrange–Euler model for spray impingement and film formation", vi: "Mô hình lai Lagrange–Euler cho phun va chạm và hình thành màng" },
    summary: {
      en: "Droplets are tracked as particles in the air and switched to a resolved liquid film once they hit the wall — the right physics at the right scale, at a fraction of the cost.",
      vi: "Giọt được theo dõi dạng hạt trong không khí và chuyển sang màng lỏng khi chạm thành — đúng vật lý ở đúng thang đo."
    },
    physics: ["Lagrangian spray", "Eulerian VOF film", "Transition model"],
    sections: [
      { h: { en: "Overview", vi: "Tổng quan" },
        p: { en: "Developed with IFPEN (French Institute of Petroleum & New Energies). Applications: fuel and urea injection, spray cooling of e-motors and power electronics, coating and cleaning processes.",
             vi: "Phát triển cùng IFPEN (Pháp). Ứng dụng: phun nhiên liệu, phun làm mát động cơ điện và điện tử công suất, phủ màng." } }
    ],
    publication: "Co-author, Development of a hybrid Lagrange–Euler transition model for the film formation and dynamics of an impinging liquid spray, Computers & Fluids (2023)."
  },

  {
    id: "gpu-amr-lbm",
    category: "methods",
    status: "in-progress",
    year: 2026,
    title: { en: "Glabos — our own GPU lattice-Boltzmann solver", vi: "Glabos — bộ giải lattice-Boltzmann trên GPU tự phát triển" },
    summary: {
      en: "A CUDA lattice-Boltzmann solver written from scratch. It matches or beats FluidX3D speed on the same GPU, reaches close to the memory-bandwidth limit, and is checked against classic benchmarks before every speed-up.",
      vi: "Bộ giải lattice-Boltzmann viết từ đầu bằng CUDA. Tốc độ ngang hoặc hơn FluidX3D trên cùng GPU, gần chạm giới hạn băng thông bộ nhớ, và được kiểm lại trên các bài chuẩn trước mỗi lần tăng tốc."
    },
    cover: "assets/img/projects/gpu-amr-lbm/cow.webp",
    video: "assets/video/glabos-cow.mp4",
    poster: "assets/video/glabos-cow.webp",
    solver: "Glabos (own development, CUDA)",
    physics: ["Lattice Boltzmann D3Q19", "FP16 storage", "LES (Smagorinsky)", "Moving bodies", "Adaptive mesh refinement"],
    metrics: [
      { v: "≈9 800", en: "MLUPs/s on one RTX 5070 Ti", vi: "MLUPs/s trên một RTX 5070 Ti" },
      { v: "99.8 %", en: "of measured copy bandwidth (periodic box)", vi: "băng thông copy đo được (hộp tuần hoàn)" },
      { v: "+2 to +12 %", en: "faster than FluidX3D on the 256³ benchmark", vi: "nhanh hơn FluidX3D ở bài chuẩn 256³" }
    ],
    client: { en: "Teams that need many transient runs fast: aerodynamics, ventilation, design exploration", vi: "Nhóm cần chạy nhiều mô phỏng chuyển tiếp nhanh: khí động, thông gió, khảo sát thiết kế" },
    sections: [
      { h: { en: "Why", vi: "Vì sao" },
        p: { en: "Lattice-Boltzmann is limited by memory bandwidth, so the goal is the fewest bytes per cell while staying correct. Glabos uses in-place Esoteric-Pull streaming, DDF shifting and 16-bit storage. FluidX3D (non-commercial licence) was only run for comparison; Glabos' code is written from published papers.",
             vi: "Lattice-Boltzmann bị giới hạn bởi băng thông bộ nhớ, nên mục tiêu là ít byte mỗi ô nhất mà vẫn đúng. Glabos dùng streaming tại chỗ Esoteric-Pull, DDF-shifting và lưu trữ 16 bit. FluidX3D (giấy phép phi thương mại) chỉ được chạy để đối chiếu; mã Glabos viết từ các bài báo công khai." },
        img: [{ src: "speed.webp", cap: "Speed vs. FluidX3D on RTX 5070 Ti and RTX 3060 (MLUPs/s)." }] },
      { h: { en: "How we check it", vi: "Kiểm chứng" },
        p: { en: "Thresholds are fixed before each run and never loosened afterwards. Passed: lid-driven cavity at Re 100–5000 against Ghia, Erturk and Botella–Peyret; steady circular cylinder at Re 20 and 40; square cylinder at Re 100 (drag and Strouhal number). Every open doubt is kept in the project log. Current work: rotating propellers and adaptive mesh refinement.",
             vi: "Ngưỡng đặt trước khi chạy và không nới sau khi thấy kết quả. Đã đạt: hộp nắp trượt Re 100–5000 so với Ghia, Erturk, Botella–Peyret; trụ tròn dòng dừng Re 20 và 40; trụ vuông Re 100 (hệ số cản và số Strouhal). Mọi nghi vấn còn mở được ghi trong nhật ký. Đang làm: cánh quạt quay và lưới thích nghi." } }
    ]
  },

  {
    id: "amr-load-balancing",
    category: "methods",
    status: "in-progress",
    year: 2026,
    title: { en: "Dynamic load balancing for adaptive mesh refinement in OpenFOAM", vi: "Cân bằng tải động cho lưới thích nghi trong OpenFOAM" },
    summary: {
      en: "A library that redistributes the mesh between processors while the mesh adapts. 1.55× faster on a free-surface test, with zero water-volume drift, and it fixes two bugs in the stock refinement code.",
      vi: "Thư viện chia lại lưới giữa các processor trong khi lưới thích nghi. Nhanh hơn 1,55 lần trên bài mặt thoáng, không trôi thể tích nước, và sửa hai lỗi trong mã làm mịn lưới gốc."
    },
    solver: "dynamicRefineBalancedFvMesh (own library, OpenFOAM v2606)",
    physics: ["Adaptive mesh refinement", "Parallel load balancing", "VOF free surface"],
    metrics: [
      { v: "×1.55", en: "speed-up on 8 ranks (2344 s → 1515 s)", vi: "tăng tốc trên 8 rank (2344 s → 1515 s)" },
      { v: "0", en: "water-volume drift after redistribution", vi: "trôi thể tích nước sau khi chia lại" },
      { v: "2", en: "bugs found and fixed in stock dynamicRefineFvMesh", vi: "lỗi tìm ra và sửa trong dynamicRefineFvMesh gốc" }
    ],
    client: { en: "OpenFOAM users running large AMR cases: floods, sloshing, sprays", vi: "Người dùng OpenFOAM chạy case AMR lớn: lũ, sóng sánh, phun" },
    sections: [
      { h: { en: "The problem", vi: "Bài toán" },
        p: { en: "With adaptive refinement, cells pile up on the processors that hold the free surface, so a few cores do most of the work. Stock OpenFOAM v2606 has no load balancing for this.",
             vi: "Khi lưới tự làm mịn, ô dồn về các processor chứa mặt thoáng, vài lõi làm phần lớn công việc. OpenFOAM v2606 gốc không có cân bằng tải cho trường hợp này." } },
      { h: { en: "What we built", vi: "Giải pháp" },
        p: { en: "When the imbalance passes a threshold, the mesh is decomposed again (keeping the 8 children of a refined cell together), moved with all fields, and every processor boundary is re-evaluated. Along the way we found that the stock code selects refinement candidates without synchronising across processors and only maps (does not recompute) processor-boundary values after refinement, which loses water. Both are fixed and verified: fields are identical before and after redistribution, and divergence matches to 1e-15.",
             vi: "Khi mất cân bằng vượt ngưỡng, lưới được chia lại (giữ 8 ô con của một ô cùng rank), di chuyển cùng mọi trường, và tính lại mọi biên processor. Trong quá trình làm đã phát hiện mã gốc chọn ô làm mịn không đồng bộ giữa các processor và chỉ ánh xạ (không tính lại) giá trị biên processor sau khi làm mịn, gây mất nước. Cả hai đã được sửa và kiểm chứng: các trường giống hệt trước và sau khi chia lại, divergence khớp tới 1e-15." } }
    ]
  },

  {
    id: "thermal-wall-model",
    category: "methods",
    status: "in-progress",
    year: 2026,
    title: { en: "Thermal wall model for high-Prandtl oil films", vi: "Mô hình nhiệt sát thành cho màng dầu Prandtl cao" },
    summary: {
      en: "Oil films on e-motor windings have a thermal boundary layer far thinner than the flow mesh. A wall model gives the right heat flux without resolving it, cutting the cost of jet-cooling simulations.",
      vi: "Màng dầu trên cuộn dây động cơ có lớp biên nhiệt mỏng hơn nhiều so với lưới dòng chảy. Mô hình sát thành cho thông lượng nhiệt đúng mà không cần giải lớp này, giảm chi phí mô phỏng làm mát bằng tia dầu."
    },
    solver: "thermalWallFoam (own development, OpenFOAM v2606)",
    physics: ["Lévêque solution", "High-Pr oil", "VOF film", "Wall modelling"],
    client: { en: "E-motor and power-electronics cooling teams", vi: "Nhóm làm mát động cơ điện và điện tử công suất" },
    sections: [
      { h: { en: "Overview", vi: "Tổng quan" },
        p: { en: "Extends the Lévêque-based near-wall model of Ingles et al. (IFPEN / Univ. Montpellier, Computers & Fluids 2026), which exists only in a closed-source code, to OpenFOAM. The constant-property version is implemented and verified on the 2-D Lévêque benchmark. Next: variable properties, coupling with the VOF oil film, and tests on impinging jets, ribbed plates and rotating discs.",
             vi: "Mở rộng mô hình sát thành dựa trên lời giải Lévêque của Ingles và cs. (IFPEN / ĐH Montpellier, Computers & Fluids 2026), vốn chỉ có trong phần mềm đóng, sang OpenFOAM. Bản tính chất hằng đã cài đặt và kiểm chứng trên bài Lévêque 2D. Tiếp theo: tính chất biến thiên, ghép với màng dầu VOF, thử trên tia va đập, tấm có gân và đĩa quay." } }
    ]
  },

  {
    id: "thanh-lanh-lake",
    category: "hazard",
    status: "in-progress",
    year: 2026,
    title: { en: "Thanh Lanh lake — terrain-based flood & landslide scenarios", vi: "Hồ Thanh Lanh — kịch bản lũ & sạt lở dựa trên địa hình" },
    summary: {
      en: "Extending the Xa Huong workflow to a second reservoir and towards a digital twin for flood early warning in northern Vietnam.",
      vi: "Mở rộng quy trình Xạ Hương sang hồ thứ hai, hướng tới Digital Twin cảnh báo lũ sớm ở miền Bắc."
    },
    physics: ["Copernicus DEM", "VOF", "Digital twin"],
    sections: [
      { h: { en: "Overview", vi: "Tổng quan" },
        p: { en: "Terrain rasters are prepared; meshing and scenario definition are under way. Part of a university research programme on open-source digital twins for flows (2027–2028).",
             vi: "Đã chuẩn bị dữ liệu địa hình; đang chia lưới và xây dựng kịch bản. Thuộc đề tài cấp Đại học về Digital Twin mã nguồn mở (2027–2028)." } }
    ]
  }
];

window.PUBLICATIONS = [
  { year: 2026, status: "under review", authors: "V.Q. Hoang", title: "A conjugate heat transfer solver for incompressible two-phase flows on heated solids", venue: "International Journal of Heat and Mass Transfer", q: "Q1", project: "cht-vof-end-winding" },
  { year: 2026, status: "accepted", authors: "V.Q. Hoang, Q.D. Do", title: "CFD simulation of smoke dispersion in underground parking garages", venue: "Applications of Modelling and Simulation", q: "", project: "garage-smoke" },
  { year: 2026, status: "submitted", authors: "Q.D. Do, V.Q. Hoang", title: "Open-source terrain-to-CFD workflow for flood risk assessment: a case study of Xa Huong reservoir", venue: "ICTA 2026", q: "", project: "xa-huong-flood" },
  { year: 2025, status: "published", authors: "V.Q. Hoang et al.", title: "An automated framework coupling DAKOTA with OpenFOAM for optimizing heat transfer in corrugated channels under pulsating flow conditions", venue: "International Journal of Heat and Fluid Flow", q: "Q1", project: "corrugated-channel-optimisation" },
  { year: 2024, status: "published", authors: "V.Q. Hoang et al.", title: "Well-balanced algorithm and height function method for dynamic contact angle in two-phase systems", venue: "Multiphase Science and Technology", q: "" },
  { year: 2023, status: "published", authors: "… , V.Q. Hoang, …", title: "Development of a hybrid Lagrange–Euler transition model for the film formation and dynamics of an impinging liquid spray", venue: "Computers & Fluids", q: "Q1", project: "spray-film-lagrange-euler" },
  { year: 2021, status: "published", authors: "V.Q. Hoang et al.", title: "Large eddy simulation of the turbulence heat and mass transfer of pulsating flow in a V-sharp corrugated channel", venue: "International Journal of Heat and Mass Transfer", q: "Q1", project: "corrugated-channel-optimisation" }
];
