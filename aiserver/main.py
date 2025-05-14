from fastapi import FastAPI
from pydantic import BaseModel
from transformers import BertTokenizer, BertForSequenceClassification, BertConfig
import torch
from safetensors.torch import load_file
from torch.nn.functional import softmax
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)

config = BertConfig.from_json_file("./config.json")  
tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")

model = BertForSequenceClassification(config)

state_dict = load_file("./model.safetensors")
model.load_state_dict(state_dict)
model.eval()

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

class InferenceRequest(BaseModel):
    context: str
    review: str

@app.post("/infer")
async def infer(data: InferenceRequest):
    inputs = tokenizer(
        data.context,
        data.review,
        return_tensors="pt",
        truncation=True,
        padding=True,
        max_length=512
    )
    inputs = {k: v.to(device) for k, v in inputs.items()}

    with torch.no_grad():
        outputs = model(**inputs)
        probs = softmax(outputs.logits, dim=-1)
        pred = torch.argmax(probs, dim=1).item()
        confidence = probs[0][pred].item()

    threshold = 0.90
    label = "Spoiler" if pred == 1 and confidence >= threshold else "Uncertain"
    print(confidence, label)
    
    return {
        "label": label,
        "confidence": round(confidence, 4)
    }
