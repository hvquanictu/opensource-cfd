"""Copy + compress figures/videos fetched from pc1 (/media/pc1) into assets/. Sources live in _src/pc1_media/ (git-ignored)."""
import os, shutil, cv2
from PIL import Image
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = os.path.join(R, "_src/pc1_media/")
IMG = {
 "gpu-amr-lbm": {"speed": P+"speed_glabos_vs_fluidx3d.png", "cow": P+"amr2_cow_9240.png"},
}
VID = {"landslide-overtopping": P+"landslide_overtopping.mp4", "landslide-gate": P+"landslide_gate_combined.mp4",
       "glabos-cow": P+"amr2_cow_10s_small.mp4"}

def save_webp(im, dst, maxw=1600):
    im = im.convert("RGB")
    if im.width > maxw: im = im.resize((maxw, round(im.height*maxw/im.width)), Image.LANCZOS)
    im.save(dst, "WEBP", quality=82, method=6)

for proj, files in IMG.items():
    d = os.path.join(R, "assets/img/projects", proj); os.makedirs(d, exist_ok=True)
    for name, src in files.items():
        save_webp(Image.open(src), os.path.join(d, name + ".webp"))

vd = os.path.join(R, "assets/video")
for name, src in VID.items():
    shutil.copyfile(src, os.path.join(vd, name + ".mp4"))
    c = cv2.VideoCapture(src); n = int(c.get(7)); c.set(1, int(n*0.6)); ok, fr = c.read()
    save_webp(Image.fromarray(cv2.cvtColor(fr, cv2.COLOR_BGR2RGB)), os.path.join(vd, name + ".webp"), 1280)
print("done")
