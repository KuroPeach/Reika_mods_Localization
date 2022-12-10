#import color

uniform float colorIntensity;
uniform float rippleIntensity;
uniform float glowIntensity;

void main() {
	vec2 texUV = texcoord.xy;
	float dv = 0.3+1.5*rippleIntensity;
	float ds = 1.0+rippleIntensity*1.5;
	float vf = 0.001+rippleIntensity*0.002;
	texUV.x += 0.47*vf*sin(23.3+texUV.y*51.8*ds+float(time)*dv/4.1);
	texUV.y += 0.62*vf*cos(34.5+texUV.x*45.7*ds+float(time)*dv/3.8);
	texUV.x += 0.167*vf*sin(23.3+texUV.y*171.8*ds+float(time)*dv/6.1);
	texUV.y += 0.145*vf*cos(34.5+texUV.x*185.7*ds+float(time)*dv/5.8);
	
    vec4 orig = texture2D(bgl_RenderedTexture, texUV);
    
    float gs = getVisualBrightness(orig.rgb);
	vec3 shifted = vec3(gs*2.75, gs*1.25, gs*0.5);
	
	vec3 color = mix(orig.rgb, max(orig.rgb, vec3(0.8, 0.3, 0.0)), glowIntensity);
	vec3 net = min(vec3(1.0), color+shifted*colorIntensity);
    
    gl_FragColor = vec4(net.r, net.g, net.b, orig.a);
}