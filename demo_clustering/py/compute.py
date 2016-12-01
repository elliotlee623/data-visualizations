import os
import random
import math
import json
import collections
import colorsys
from PIL import Image

def getRGBstring( pixel ):
    (r, g, b) = pixel
    s = "#"
    s = s + format(r, '02x')
    s = s + format(g, '02x')
    s = s + format(b, '02x')
    return s

def getFreqData(img):
    w, h = img.size
    pixels = img.load()
    freq = collections.Counter()

    for x in range(w):
        for y in range(h):
            color = getRGBstring( pixels[x, y] )
            freq[ color ] += 1

    return freq

def getKey(x, y):
    return str(x) + "," + str(y)

def k_means_dist(point, centroid, w, h):
    # Features of the pixel
    x0 = point["x"] / w
    y0 = point["y"] / h
    r0 = point["r"] / 255
    g0 = point["g"] / 255
    b0 = point["b"] / 255
    (h0, l0, s0) = colorsys.rgb_to_hls(r0, g0, b0)

    # Features of the centroid
    x1 = centroid["x"] / w
    y1 = centroid["y"] / h
    r1 = centroid["r"] / 255
    g1 = centroid["g"] / 255
    b1 = centroid["b"] / 255
    (h1, l1, s1) = colorsys.rgb_to_hls(r1, g1, b1)

    # Square diffs
    d_x = math.pow(x0 - x1, 2)
    d_y = math.pow(y0 - y1, 2)

    d_r = math.pow(r0 - r1, 2)
    d_g = math.pow(g0 - g1, 2)
    d_b = math.pow(b0 - b1, 2)

    d_h = math.pow(h0 - h1, 2)
    d_s = math.pow(s0 - s1, 2)
    d_l = math.pow(l0 - l1, 2)

    # Distance metric
    return math.sqrt( d_x + d_y )


def k_means_label_points_with_nearest_centroid(points, centroids, w, h):
    # Label each point to nearest centroid
    for pointKey in points:
        point = points[pointKey]

        nearest_centroid = None
        nearest_centroid_dist = 0

        for centroid in centroids:
            dist = k_means_dist(point, centroid, w, h)

            if nearest_centroid == None or dist < nearest_centroid_dist:
                nearest_centroid = centroid
                nearest_centroid_dist = dist

        point["centroid"] = nearest_centroid

def k_means_find_new_centroids(points, centroids):
    # Update the centroids
    new_centroids = []
    for centroid in centroids:
        sum_x = 0
        sum_y = 0
        sum_r = 0
        sum_g = 0
        sum_b = 0
        ct = 0

        for pointKey in points:
            point = points[pointKey]

            if point["centroid"] == centroid:
                sum_x += point["x"]
                sum_y += point["y"]
                sum_r += point["r"]
                sum_g += point["g"]
                sum_b += point["b"]
                ct += 1

        if ct > 0:
            new_centroids.append({
                "x": sum_x / ct,
                "y": sum_y / ct,
                "r": sum_r / ct,
                "g": sum_g / ct,
                "b": sum_b / ct,
            })

    return new_centroids

def k_means_join_centroids(centroids, w, h):
    new_centroids = []
    removed_centroids = []
    for centroid in centroids:
        if centroid in removed_centroids:
            continue

        for centroid2 in centroids:
            if centroid2 in removed_centroids:
                continue

            #if k_means_dist(centroid, centroid2, w, h) < 100:
            #    removed_centroids.append(centroid2)

        new_centroids.append(centroid)

    return new_centroids

def create_image_by_centroid(points, centroids, w, h):
    colors = [
        (0, 0, 0),
        (255, 0, 0),
        (0, 255, 0),
        (0, 0, 255),
        (255, 255, 0),
        (255, 0, 255),
        (0, 255, 255),
        (255, 255, 255),
        (64, 0, 0),
        (128, 0, 0),
        (192, 0, 0),
        (0, 64, 0),
        (0, 128, 0),
        (0, 192, 0),
        (0, 0, 64),
        (0, 0, 128),
        (0, 0, 192),
        (64, 64, 0),
        (64, 128, 0),
        (64, 192, 0),
        (64, 255, 0),
        (64, 0, 64),
        (64, 0, 128),
        (64, 0, 192),
        (64, 0, 255),
    ]

    im = Image.new("RGB", (w, h))
    pixels = im.load()
    for i in range(len(centroids)):
        centroid = centroids[i]
        color = colors[i]

        for pointKey in points:
            point = points[pointKey]

            if point["centroid"] == centroid:
                x = point["x"]
                y = point["y"]
                pixels[x, y] = color

    return im

def k_means_cluster(img, k):
    w, h = img.size

    points = {}
    pixels = img.load()
    for x in range(w):
        for y in range(h):
            pixel = pixels[x, y]
            (r, g, b) = pixel
            key = getKey(x, y)
            points[key] = {
                "x": x, "y": y,
                "r": r, "g": g, "b": b,
                "centroid": None
            }

    # Find k random points to seed the initial centroids
    centroids = []
    for i in range(k):
        x = random.randint(0, w)
        y = random.randint(0, h)
        centroids.append({
            "x": x,
            "y": y,
            "r": points[getKey(x, y)]["r"],
            "g": points[getKey(x, y)]["g"],
            "b": points[getKey(x, y)]["b"],
        })

    for i in range(10):
        print("Starting pass " + str(i) + "...")

        # Label
        k_means_label_points_with_nearest_centroid(points, centroids, w, h)
        print("  ...points labeled!")

        # save image
        centroid_img = create_image_by_centroid(points, centroids, w, h)
        centroid_img.save("res/c_" + str(i) + ".png", "PNG")
        print("  ...image saved!")

        # Find new centroids
        centroids = k_means_find_new_centroids(points, centroids)
        print("  ...new centroids found!")

        # Remove nearby centroids
        centroids = k_means_join_centroids(centroids, w, h)



fileName = "res/uiuc.jpg"
img = Image.open(fileName)

freq = k_means_cluster(img, 10)

output = { 'file': fileName,
           'freq': freq }

with open('res/freq.json', 'w') as f:
    json.dump(output, f, indent=2)
