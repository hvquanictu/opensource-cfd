"""Copy + compress source figures/videos into assets/. Re-run after adding new media."""
import os, shutil, cv2, numpy as np
from PIL import Image
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
S = "G:/My Drive/tai_lieu_truong_ictu/Đề tài/Đề tài đại học Quan mô phỏng số/Slide_bao_ve/img/"
O = "G:/My Drive/opensource_cfd/"
IMG = {
 "cht-vof-end-winding": {
   "hero": S+"cht/graphical_abstract.png", "film": S+"cht/fig_ew_film_v4.png", "setup": S+"cht/fig_ew_setup.jpg",
   "mesh": S+"cht/fig_ew_mesh.png", "jet-setup": S+"cht/fig_setup_v3.png", "nu-re": S+"cht/fig_nu_re_v2.png",
   "contact-1d": S+"cht/fig_1d_contact_v2.png", "drop-thermal": S+"cht/fig_drop_thermal.png", "drop-spread": S+"cht/fig_drop_spread.png"},
 "xa-huong-flood": {
   "satellite": S+"dam/img-000.png", "terrain-pipeline": S+"dam/img-002.png", "terrain-3d": O+"ArticleDam breaking/3d_real.png",
   "u-t1": S+"dam/img-004.png", "u-t2": S+"dam/img-006.png", "u-t3": S+"dam/img-008.png", "u-t4": S+"dam/img-010.png",
   "monitoring": S+"dam/plot_velocity_level.png"},
 "garage-smoke": {
   "model": S+"garage/garage_model_3d.png", "mesh": S+"garage/mesh_preview.png", "smoke-60": S+"garage/smoke_t60.png",
   "smoke-120": S+"garage/smoke_t120.png", "smoke-180": S+"garage/smoke_t180.png", "smoke-270": S+"garage/smoke_t270.png",
   "temperature": S+"garage/temperature_t120.png", "velocity": S+"garage/velocity_t120.png", "validation": S+"garage/validation_ampofo.png"},
}
VID = {"end-winding-oil-film": "end_winding_oil_film.mp4", "motor-oil-jet": "electric_motor.mp4",
       "hot-liquid-a": "0906.mp4", "hot-liquid-b": "cht_injector_oil_hot_opject.mp4", "office-comfort": "videos.mp4"}

def save_webp(im, dst, maxw=1600):
    im = im.convert("RGB")
    if im.width > maxw: im = im.resize((maxw, round(im.height*maxw/im.width)), Image.LANCZOS)
    im.save(dst, "WEBP", quality=82, method=6)

for proj, files in IMG.items():
    d = os.path.join(R, "assets/img/projects", proj); os.makedirs(d, exist_ok=True)
    for name, src in files.items():
        save_webp(Image.open(src), os.path.join(d, name + ".webp"))

vd = os.path.join(R, "assets/video"); os.makedirs(vd, exist_ok=True)
for name, src in VID.items():
    src = os.path.join(R, "_src/video", src)
    shutil.copyfile(src, os.path.join(vd, name + ".mp4"))
    c = cv2.VideoCapture(src); n = int(c.get(7)); c.set(1, int(n*0.6)); ok, fr = c.read()
    save_webp(Image.fromarray(cv2.cvtColor(fr, cv2.COLOR_BGR2RGB)), os.path.join(vd, name + ".webp"), 1280)
print("done")
